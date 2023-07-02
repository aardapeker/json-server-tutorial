export const editor = new EditorJS({
  holder: 'editorjs',
  placeholder: 'Let`s write an awesome story!',
  tools: {
    header: {
      class: Header,
      config: {
        placeholder: 'Enter a header',
        levels: [1, 2, 3, 4],
        defaultLevel: 2
      }
    }
  }
});
