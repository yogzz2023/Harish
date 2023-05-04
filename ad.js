const handleButtonClick = () => {
  const audioName = 'mp3.mp3';
  const audioDirectory = '/path/to/audio/directory';
  axios.get(`http://localhost:8080/audio?name=${audioName}&directory=${audioDirectory}`, {
    responseType: 'blob',
    headers: {
      Range: 'bytes=0-',
    },
  })
    .then((response) => {
      const url = URL.createObjectURL(response.data);
      setAudioSrc(url);
    })
    .catch((error) => {
      console.error('Error fetching audio:', error);
    });
};





const express = require('express');
const cors = require('cors');
const app = express();
const path = require('path');
const fs = require('fs');

app.use(cors({
  origin: 'http://localhost:3000' // Set the origin to your React app's domain
}));

app.get('/audio', (req, res) => {
  const audioName = req.query.name;
  const audioDirectory = req.query.directory;
  const audioFilePath = path.join(audioDirectory, audioName);
  const audioFileStat = fs.statSync(audioFilePath);

  const { range } = req.headers;
  const fileSize = audioFileStat.size;
  const start = Number((range || '').replace(/bytes=/, '').split('-')[0]);
  const end = fileSize - 1;
  const chunkSize = (end - start) + 1;
  const headers = {
    'Content-Range': `bytes ${start}-${end}/${fileSize}`,
    'Accept-Ranges': 'bytes',
    'Content-Length': chunkSize,
    'Content-Type': 'audio/mpeg',
  };

  res.writeHead(206, headers);

  const audioStream = fs.createReadStream(audioFilePath, { start, end });

  audioStream.pipe(res);
});



import MUIDataTable from "mui-datatables";

const columns = ["Name", "Title", "Location"];
const data = [
  ["Gabby George", "Business Analyst", "Minneapolis"],
  ["Aiden Lloyd", "Business Consultant", "Dallas"],
  ["Jaden Collins", "Attorney", "Santa Ana"],
  ["Franky Rees", "Business Analyst", "St. Petersburg"],
  ["Aaren Rose", "Business Consultant", "Toledo"]
];

const options = {
  customFooter: () => (
    <MuiTableFooter style={{ backgroundColor: "red", height: "20px", border: "none" }}>
      <MuiTableRow>
        <MuiTableCell colSpan={columns.length}>
          Custom footer content goes here
        </MuiTableCell>
      </MuiTableRow>
    </MuiTableFooter>
  ),
  theme: {
    overrides: {
      MuiTableHead: {
        root: {
          backgroundColor: "green",
          height: "30px",
          border: "none"
        }
      }
    }
  }
};

function App() {
  return (
    <MUIDataTable
      title={"Employee List"}
      data={data}
      columns={columns}
      options={options}
    />
  );
}

export default App;



import MUIDataTable from "mui-datatables";

const columns = ["Name", "Title", "Location"];
const data = [
  ["Gabby George", "Business Analyst", "Minneapolis"],
  ["Aiden Lloyd", "Business Consultant", "Dallas"],
  ["Jaden Collins", "Attorney", "Santa Ana"],
  ["Franky Rees", "Business Analyst", "St. Petersburg"],
  ["Aaren Rose", "Business Consultant", "Toledo"]
];

const options = {
  customFooter: () => (
    <MuiTableFooter>
      <MuiTableRow>
        <MuiTableCell
          colSpan={columns.length}
          style={{ backgroundColor: "red", height: "20px", border: "none" }}
        >
          Custom footer content goes here
        </MuiTableCell>
      </MuiTableRow>
    </MuiTableFooter>
  ),
  customHead: () => (
    <MuiTableHead>
      <MuiTableRow>
        {columns.map(column => (
          <MuiTableCell
            key={column}
            style={{ backgroundColor: "green", height: "30px", border: "none" }}
          >
            {column}
          </MuiTableCell>
        ))}
      </MuiTableRow>
    </MuiTableHead>
  )
};

function App() {
  return (
    <MUIDataTable
      title={"Employee List"}
      data={data}
      columns={columns}
      options={options}
    />
  );
}

export default App;



import MUIDataTable from "mui-datatables";
import { useState, useEffect } from "react";

function App() {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch("https://api.example.com/data")
      .then(response => response.json())
      .then(data => setData(data));
  }, []);

  const columns = ["Name", "Title", "Location"];

  const options = {
    expandableRows: true,
    renderExpandableRow: (rowData, rowMeta, expanded) => {
      const colSpan = rowData.length + 1;
      if (expanded) {
        return (
          <tr>
            <td colSpan={colSpan}>
              <div>
                <p>Title: {rowData[1]}</p>
                <p>Location: {rowData[2]}</p>
                <p>Custom content goes here</p>
              </div>
            </td>
          </tr>
        );
      } else {
        return null;
      }
    }
  };

  return (
    <MUIDataTable
      title={"Employee List"}
      data={data}
      columns={columns}
      options={options}
    />
  );
}

export default App;



import MUIDataTable from "mui-datatables";
import { useState } from "react";

const data = [
  ["Gabby George", "Business Analyst", "Minneapolis"],
  ["Aiden Lloyd", "Business Consultant", "Dallas"],
  ["Jaden Collins", "Attorney", "Santa Ana"],
  ["Franky Rees", "Business Analyst", "St. Petersburg"],
  ["Aaren Rose", "Business Consultant", "Toledo"]
];

const columns = ["Name", "Title", "Location"];

const options = {
  expandableRows: true,
  renderExpandableRow: (rowData, rowMeta) => {
    const colSpan = rowData.length + 1;
    return (
      <tr>
        <td colSpan={colSpan}>
          <div>
            <p>Additional details for {rowData}</p>
            <p>Title: {rowData[1]}</p>
            <p>Location: {rowData[2]}</p>
          </div>
        </td>
      </tr>
    );
  }
};

function App() {
  return (
    <MUIDataTable
      title={"Employee List"}
      data={data}
      columns={columns}
      options={options}
    />
  );
}

export default App;



import MUIDataTable from "mui-datatables";
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles';
...

// here I set the them
const getMuiTheme = () => createMuiTheme({
    overrides: {
        MuiTableHead: {
            root: {
                backgroundColor: "#c1e1ec"
            }
        }
    }
});

...

// rendering
<MuiThemeProvider theme={getMuiTheme()}>                                                    
    <MUIDataTable
        title={"Existing Users"}
        data={users}
        columns={columns}
        options={options}
    />
</MuiThemeProvider>

MuiTableCell: {
    head: {
        backgroundColor: "red !important"
    }
}





MUIDataTableHeadCell: {
    sortAction: {
        '& path': {
          color: "teal " // or whatever you need
        }, 
     }, 
    sortActive: {
      color: ""  // whatever you need
    }
  }, 
