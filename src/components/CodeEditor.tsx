import React, { useState, useCallback } from 'react';
import Editor from '@monaco-editor/react';

interface EditorTheme {
  isDark: boolean;
  fontFamily: string;
  fontSize: number;
}

interface CodeEditorProps {
  initialValue?: string;
  language?: string;
  onChange?: (value: string) => void;
  readOnly?: boolean;
  theme?: EditorTheme;
  onSave?: (code: string) => Promise<void>;
  onError?: (error: Error) => void;
  extensions?: string[];
}

interface EditorOptions extends monaco.editor.IStandaloneEditorConstructionOptions {
  contextMenu?: boolean;
  quickSuggestions?: boolean;
}

const CodeEditor: React.FC<CodeEditorProps> = ({
  initialValue = '',
  language,
  onChange,
  readOnly = false,
}) => {
  const [code, setCode] = useState(initialValue);

  const detectLanguage = useCallback((content: string) => {
    // Simple language detection based on file extension or content
    if (content.includes('<?php')) return 'php';
    if (content.includes('import React')) return 'typescript';
    if (content.includes('<html>')) return 'html';
    return language || 'javascript';
  }, [language]);

  const handleChange = (value: string = '') => {
    setCode(value);
    onChange?.(value);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(code);
  };

  const handleSave = () => {
    const blob = new Blob([code], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `code.${detectLanguage(code)}`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="code-editor-wrapper">
      <div className="code-editor-toolbar">
        <button onClick={handleCopy}>Copy</button>
        <button onClick={handleSave}>Save</button>
      </div>
      <div className="code-editor-container">
        <Editor
          height="400px"
          language={detectLanguage(code)}
          value={code}
          onChange={handleChange}
          theme="vs-dark"
          options={{
            minimap: { enabled: false },
            fontSize: 14,
            scrollBeyondLastLine: false,
            automaticLayout: true,
            readOnly,
            wordWrap: 'on',
            lineNumbers: 'on',
            folding: true,
          }}
        />
      </div>
    </div>
  );
};

export default CodeEditor;
