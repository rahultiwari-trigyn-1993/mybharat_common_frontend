import fs from 'node:fs';
const p =
  'C:/Users/Rahul.Tiwari/.cursor/projects/d-mybharat-common-frontend/agent-transcripts/43372303-ffc5-42ce-b6a5-3f53706c7b3e/43372303-ffc5-42ce-b6a5-3f53706c7b3e.jsonl';
for (const line of fs.readFileSync(p, 'utf8').split('\n')) {
  if (!line.includes('form_c2')) continue;
  try {
    const j = JSON.parse(line);
    const text = j.message?.content?.[0]?.text ?? '';
    for (const needle of ['form_c2', 'saveUserFeedback', 'Feedbackerr', 'user_feedback']) {
      let idx = 0;
      while ((idx = text.indexOf(needle, idx)) >= 0) {
        console.log('\n---', needle, 'at', idx, '---\n');
        console.log(text.slice(Math.max(0, idx - 200), idx + 1200));
        idx += needle.length;
        if (needle === 'form_c2') break;
      }
    }
    break;
  } catch {
    /* ignore */
  }
}
