import type {editor} from "monaco-editor";
import {Component} from "react";
import type MonacoEditor from "react-monaco-editor";
import type {EditorDidMount} from "react-monaco-editor";

interface EditorProps {
  MonacoEditor: typeof MonacoEditor;
  code: string;
  onChange?: (code: string) => void;
  isReadOnly?: boolean;
  isPlaintext?: boolean;
  options?: editor.IEditorConstructionOptions;
  width: number;
  height: number;
}

export default class Editor extends Component<EditorProps> {
  editor: editor.IStandaloneCodeEditor | null = null;

  componentDidMount(): void {
    setTimeout(this.invalidate, 0);
  }

  _editorDidMount: EditorDidMount = (monacoEditor, monaco) => {
    this.editor = monacoEditor;
    monaco.languages.typescript.typescriptDefaults.setDiagnosticsOptions({
      noSemanticValidation: true,
      noSyntaxValidation: true,
      noSuggestionDiagnostics: true,
    });
    this.invalidate();
  };

  invalidate = (): void => {
    if (this.editor) {
      this.editor.layout();
    }
  };

  render(): JSX.Element {
    const {MonacoEditor, code, onChange, isReadOnly, isPlaintext, options, width, height} =
      this.props;
    return (
      <MonacoEditor
        editorDidMount={this._editorDidMount}
        width={width}
        height={height}
        language={isPlaintext ? undefined : "typescript"}
        theme="vs-dark"
        value={code}
        onChange={onChange}
        options={{
          minimap: {enabled: false},
          readOnly: isReadOnly,
          ...options,
        }}
      />
    );
  }
}
