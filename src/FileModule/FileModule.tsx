import React from 'react';
import { PlusCircle } from 'react-feather';
import { File } from '../types';
import FileTable from './FileTable';

interface Props {
}

interface State {
  files: File[]
}

const demoFiles: File[] = [
  // {
  //   id: "efwrjkcm5ug",
  //   name: "somefilename.png",
  //   size: 1024*40,
  // },
  // {
  //   id: "d4krqo197rb",
  //   name: "anotherFile.avi",
  //   size: 1024*1024*5,
  // }
]

export default class FileModule extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { files: demoFiles };
  }

  render() {
    return (
      <div className="pt-2 my-md-3 p-md-3">
        <h4 className="text-muted">
          Uploaded files
          <button className="btn btn-mini">
            <PlusCircle />
          </button>
        </h4>
        <FileTable files={ this.state.files } />
      </div>
    );
  }
}
