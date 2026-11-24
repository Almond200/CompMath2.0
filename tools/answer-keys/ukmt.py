"""Extract numbered answers from cached UKMT solution PDFs."""

import json
import os
from pathlib import Path
import re
import subprocess


WORK = Path(os.environ.get("KEYS_WORK", "/tmp/answer-keys-work"))
ROUNDS = {"smc": "Senior", "imc": "Intermediate", "jmc": "Junior"}
SHORT_KEY = re.compile(r"(?m)^[ \t]*(\d{1,2})\.[ \t]+([A-E]|\d{1,3})(?=[ \t]|$)")
EXTENDED_KEY = re.compile(r"(?im)^[ \t]*Solution(?:[ \t]+|[ \t]*\n[ \t]*)([A-E])(?=[ \t]|$)")
KEY_TABLE = re.compile(r"(?m)^[ \t]*(1(?:[ \t]+\d{1,2}){24})[ \t]*\n[ \t]*([A-E](?:[ \t]+[A-E]){24})[ \t]*$")


def numbered_answers(text):
    labels = SHORT_KEY.findall(text)
    if [int(number) for number, _ in labels] == list(range(1, 26)):
        return [answer for _, answer in labels]
    labels = EXTENDED_KEY.findall(text)
    table = KEY_TABLE.search(text)
    if table and [int(number) for number in table[1].split()] == list(range(1, 26)):
        answers = table[2].split()
        if len(labels) == 25 and [letter.upper() for letter in labels] != answers:
            raise ValueError("The table and worked solutions disagree")
        return answers
    if len(labels) == 25:
        return [letter.upper() for letter in labels]
    return []


def main():
    papers = json.loads((WORK / "urls.json").read_text())["UKMT"]
    keys, typed = {}, {}
    directory = WORK / "ukmt"
    for paper in sorted(papers):
        year, _, round_name = paper.split("-")
        path = directory / f"{paper}-solutions.pdf"
        text = subprocess.check_output(["pdftotext", "-layout", str(path), "-"], text=True)
        text = text.replace("\f", "\n")
        title = rf"{ROUNDS[round_name]}\s+Mathematical\s+Challenge"
        date_text = text
        if year not in date_text:
            date_text = subprocess.check_output(
                ["pdftotext", "-layout", "-l", "2", str(directory / f"{paper}-paper.pdf"), "-"], text=True
            )
        if not all(re.search(title, document, re.I) for document in (text, date_text)) or year not in date_text:
            raise ValueError(f"{path.name} has the wrong contest or year")
        answers = numbered_answers(text)
        if len(answers) != 25:
            raise ValueError(f"{path.name} lacks a complete numbered key")
        for number, answer in enumerate(answers, 1):
            ledger = typed if answer.isdigit() else keys
            ledger[f"{paper}-{number}"] = answer
    (directory / "keys.json").write_text(json.dumps(keys, indent=2) + "\n")
    (directory / "typed.json").write_text(json.dumps(typed, indent=2) + "\n")
    print(f"{len(keys)} choice keys and {len(typed)} typed keys from {len(papers)} UKMT papers")


if __name__ == "__main__":
    main()
