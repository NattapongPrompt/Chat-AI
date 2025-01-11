import React, { useState } from 'react';
import Editor from '@monaco-editor/react';

interface CodeEditorProps {
  initialValue?: string;
  language?: string;
  onChange?: (value: string) => void;
}

const CodeEditor: React.FC<CodeEditorProps> = ({
  initialValue = '',
  language = 'javascript',
  onChange,
}) => {
  const [code, setCode] = useState(initialValue);

  const handleChange = (value: string = '') => {
    setCode(value);
    onChange?.(value);
  };

  return (
    <div className="code-editor-container">
      <Editor
        height="400px"
        language={language}
        value={code}
        onChange={handleChange}
        theme="vs-dark"
        options={{
          minimap: { enabled: false },
          fontSize: 14,
          scrollBeyondLastLine: false,
          automaticLayout: true,
        }}
      />
    </div>
  );
};

export default CodeEditor;
