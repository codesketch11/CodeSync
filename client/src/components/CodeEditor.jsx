import Editor from "@monaco-editor/react";

const CodeEditor = ({ code, language, onChange }) => {
    return (
        <Editor
            height="500px"
            language={language}
            value={code}
            theme="vs-dark"
            onChange={onChange}
            options={{
                fontSize: 14,
                lineHeight: 22,
                tabSize: 4,
                wordWrap: "off",
                scrollBeyondLastLine: false,
                renderLineHighlight: "line",
                padding: { top: 12, bottom: 12 },
                minimap: {
                    enabled: false,
                },
                automaticLayout: true,
            }}
        />
    );
};

export default CodeEditor;