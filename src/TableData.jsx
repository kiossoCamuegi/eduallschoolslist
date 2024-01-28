import * as React from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import { Refresh, Search, Update } from '@mui/icons-material';
import CreateEditModal from './CreateEditModal';
import Hoot from './Hoot';
import axios from "axios";

const types =  [
    <div className="badge bg-info">Escola privada</div> ,
     <div className="badge bg-warning">Escola publica</div>,
     <div className="badge bg-main">Colégio</div>,
     <div className="badge bg-primary">Universidade Privada</div>,
     <div className="badge bg-success">Universidade Publica</div>,
     <div className="badge bg-secondary">Creche</div>  
  ];
 
  
const columns = [
  { id: 'name', label: 'Nome', minWidth: 170 },
  { id: 'location', label: 'Localização', minWidth: 100 },
  {
    id: 'type',
    label: 'Tipo de instituição',
    minWidth: 170,
    align: 'left',  
  },
  {
    id: 'phone',
    label: 'Telefone',
    minWidth: 100,
    align: 'right',
    format: (value) => value.toLocaleString('en-US'),
  },
  {
    id: 'email',
    label: 'Email',
    minWidth: 170,
    align: 'right',
    format: (value) => value.toFixed(2),
  },
  {
    id: 'action',
    label: 'Ação',
    minWidth: 170,
    align: 'right', 
  },
];

function createData(name, location, email, phone, type, action) { 
  return { name, location, type , phone, email, action};
}

 

export default function TableData() { 
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(16);
     const [rows, setRows] = React.useState([]);
     const [Loading, setLoading] =  React.useState(false);
     const [filteredData, setFilteredData] = React.useState(rows);


    const LoadData = async()=>{
      setLoading(false);
     try {
       let list  = [];
       setRows([]);
          const response = await axios.get(Hoot()+"schools");
          console.log(Hoot()+"schools");
          console.log(response.data);

          response.data.map((item)=>{
             list.push(
               createData(item.name, item.location, item.email, item.phone, types[item.type], <CreateEditModal title="Atualizar " update url={Hoot()+"updateschool/"+item._id} get={Hoot()+"schoolget/"+item._id} toggle_btn={<button className="btn"><Update /></button>}/> ), 
             );
          })
          setRows(list);
          setFilteredData(list);
          setLoading(true);
     } catch (error) {
      console.log(error);
      setLoading(true);
     }
    }

    React.useEffect(() => {
      LoadData();
    }, []);

  
    const handleChangePage = (event, newPage) => {
      setPage(newPage);
    };
  
    const handleChangeRowsPerPage = (event) => {
      setRowsPerPage(+event.target.value);
      setPage(0);
    };




      const FilterData = (e)=>{
        const value = e.target.value.toLowerCase();
        const filtered = rows.filter(data => data.name.toLowerCase().includes(value));
        setFilteredData(filtered);
      }


  
    return (
    <div className="table-box">
        <div className="search-box">
        <input type="text" onChange={FilterData} placeholder='Pesquisar ...' className="form-control" />
         <div className="icon"><Search/> </div>
         <div className="ml-2">
             <button className={Loading === true ? "bg-main btn RFS" : "bg-warning btn RFS"} onClick={()=>LoadData()} >{rows.length}  <Refresh /></button>
         </div>
      </div>
      <Paper sx={{ width: '100%', overflow: 'hidden' }}>
        <TableContainer sx={{ maxHeight: 850 }}>
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                {columns.map((column) => (
                  <TableCell
                    key={column.id}
                    align={column.align}
                    style={{ minWidth: column.minWidth }}
                  >
                    {column.label}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredData
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row) => {
                  return (
                    <TableRow hover role="checkbox" tabIndex={-1} key={row.code}>
                      {columns.map((column) => {
                        const value = row[column.id];
                        return (
                          <TableCell key={column.id} align={column.align}>
                            {column.format && typeof value === 'number'
                              ? column.format(value)
                              : value}
                          </TableCell>
                        );
                      })}
                    </TableRow>
                  );
                })}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[10, 25, 100]}
          component="div"
          count={rows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
        </div>
    );
}

 