"""Shared printed premises survive importing follow-up questions on their own."""
import importlib.util
import os
from pathlib import Path
import tempfile

with tempfile.TemporaryDirectory() as cache:
    os.environ["MATH_LIVE_CACHE"] = cache
    source = Path(__file__).resolve().parents[1] / "tools/fetch-live-statements.py"
    spec = importlib.util.spec_from_file_location("statements", source)
    module = importlib.util.module_from_spec(spec)
    spec.loader.exec_module(module)
    premise = r"The students in Mrs. Reed's class read a \(760\)-page book at \(20\), \(45\), and \(30\) seconds per page."
    questions = [{"question": "unrelated"} for _ in range(16)]
    questions[13] = {"question": "A Novel Assignment\n\n" + premise + "\n\nIf Bob and Chandra read the book?"}
    questions[14] = {"question": "Which page divides the book?", "a": "425"}
    questions[15] = {"question": "How long when three read together?"}
    for n in (15, 16):
        q = module.question_with_context(questions, "amc8", "2006", n)
        assert q["question"].startswith(premise + "\n\n")
        assert "If Bob and Chandra" not in q["question"]
        rendered = module.statement(q, "amc8", "2006", n, [])
        assert "$760$" in rendered and "$45$" in rendered
        assert not questions[n - 1]["question"].startswith(premise)
    assert module.question_with_context(questions, "amc8", "2007", 15) is questions[14]
    cookies = [{"question": "unrelated"} for _ in range(10)]
    cookies[7] = {"question": 'Four friends, Art, Roger, Paul and Trisha bake cookies.\n\n<img src="/amc8/2003/bs_1.svg"/>\n\nArt makes \\(12\\) cookies.\n\nWho gets the fewest?'}
    for n in (9, 10):
        q = module.question_with_context(cookies, "amc8", "2003", n)
        figs = []
        rendered = module.statement(q, "amc8", "2003", n, figs)
        assert "$12$" in rendered and "@@fig:amc8/2003/bs_1.svg@@" in rendered
        assert figs == ["/amc8/2003/bs_1.svg"]
        assert "Who gets the fewest" not in rendered
    questions[14] = dict(questions[14], question=premise + "\n\nAlready complete")
    assert module.question_with_context(questions, "amc8", "2006", 15) is questions[14]
    questions[13] = {"question": "changed source"}
    try:
        module.question_with_context(questions, "amc8", "2006", 16)
    except ValueError:
        pass
    else:
        raise AssertionError("changed source boundaries must not silently import a wrong premise")
print("OK - shared source premise, standalone rendering, no mutation/duplication, fail-closed boundaries")
