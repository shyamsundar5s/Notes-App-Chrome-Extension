const noteArea = document.getElementById('note');
const saveButton = document.getElementById('save');
const downloadButton = document.getElementById('download');

// Load saved note
document.addEventListener('DOMContentLoaded', () => {
  chrome.storage.sync.get('note', data => {
    noteArea.value = data.note || '';
  });
});

// Save note
saveButton.addEventListener('click', () => {
  chrome.storage.sync.set({ note: noteArea.value }, () => {
    alert('Note saved!');
  });
});

// Download note
downloadButton.addEventListener('click', () => {
  const blob = new Blob([noteArea.value], { type: 'text/plain' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = 'quick-note.txt';
  a.click();
  URL.revokeObjectURL(url);
});
