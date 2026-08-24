#!/bin/bash
#
# Surfaces work that is waiting for a session with real internet access.
#
# Cairn's remote sandboxes (Claude Code on the web) have no outbound network:
# hfea.gov.uk, clinic price lists and publisher feeds are all unreachable
# there. Some jobs therefore cannot be done from a remote session at all, and
# the risk is not that they go wrong — it is that they quietly never happen,
# because the session that could do them has no idea they are waiting.
#
# So: on a LOCAL session, print the checklist. On a remote one, say nothing —
# a reminder you cannot act on is just noise.
#
# The checklist lives in .claude/pending-network-tasks.md. Finish a task,
# delete its entry; when the file is empty or gone, this goes quiet on its
# own. A reminder that cannot switch itself off stops being read.
set -uo pipefail

# Remote sessions cannot action any of this.
if [ "${CLAUDE_CODE_REMOTE:-}" = "true" ]; then
  exit 0
fi

TASKS="${CLAUDE_PROJECT_DIR:-.}/.claude/pending-network-tasks.md"
[ -r "$TASKS" ] || exit 0

# Ignore a file that is only comments and blank lines.
if ! grep -qE '^[[:space:]]*-' "$TASKS" 2>/dev/null; then
  exit 0
fi

cat <<'NOTE'
This session is running locally, so it has internet access that Cairn's remote
sessions do not. The repo is carrying work that has been waiting for exactly
that. Mention it to the user in your first reply — briefly, as an offer, not a
lecture — then carry on with whatever they actually asked for. It is a standing
note, not an instruction to start work unprompted.
NOTE
echo
cat "$TASKS"
echo
echo "(Source: .claude/pending-network-tasks.md — delete an entry once it is done.)"
