/* eslint-disable jsx-a11y/alt-text */

/**
=========================================================
* Material Dashboard 2 React - v2.0.0
=========================================================

* Product Page: https://www.creative-tim.com/product/material-dashboard-react
* Copyright 2021 Creative Tim (https://www.creative-tim.com)

Coded by www.creative-tim.com

 =========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/

// @mui material components
import Grid from "@mui/material/Grid";
import DataTable from "examples/Tables/DataTable";
// Material Dashboard 2 React components
import MDBox from "components/MDBox";
// Material Dashboard 2 React example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import data from "layouts/dashboard/components/Projects/data";
// Data

// Dashboard components
import Projects from "layouts/dashboard/components/Projects";
import OrdersOverview from "layouts/dashboard/components/OrdersOverview";
import Card from "@mui/material/Card";
import ReactPaginate from "react-paginate";
import { useEffect, useState } from "react";
import { getBusinesses } from "components/api";
import { Table } from "@mui/material";
import Holder from "./tableholder";
import { toast } from "react-toastify";
import moment from "moment";
import './pagination.css';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Box from '@mui/material/Box';

function Users() {
  const [businesses, setBusinesses] = useState([]);
  const [page, setPage] = useState(0);
  const [size, setSize] = useState(20);
  const [firstRun, setFirstRun] = useState(true);
  const [loading, setLoading] = useState(true);
  const [pageCount, setPageCount] = useState(0);
  const { columns, rows } = data();
  useEffect(() => {
    if (firstRun) {
      setFirstRun(false);
      fetchUsers(page, size);
    }
  }, [firstRun]);
  const  handlePageClick = async (e) => {
    const newpage = e.selected;
    setPage(newpage);
    fetchUsers(newpage,size);
  }
  const fetchUsers = async (page, size) => {
    setLoading(true);
    const userslist = await getBusinesses(page, size);
    setLoading(false);
    if(userslist.status===200){
      console.log(userslist.data.data);
      setBusinesses(userslist.data.data.businesses);
//       current_page: 0
// first_page: true
// last_page: false
// pages: 2
// total: 15
      //console.log(userslist.data.data.pages);
      setPageCount(userslist.data.data.pages);
    }
    else {
      toast.error('Unknown error Occured',{
        position:'bottom-left'
      })
    }
  };
  return (
    <DashboardLayout>
      <DashboardNavbar />
      <MDBox py={3}>
        <MDBox>
          <Grid container spacing={3}>
            <Grid item xs={12} md={12} lg={12}>
              <Card>
              {/* <FormControl sx={{ m: 1, minWidth: 80, height:100 }}>
              <InputLabel id="demo-simple-select-label">Age</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                label="Age"
              >
                <MenuItem value={10}>Ten</MenuItem>
                <MenuItem value={20}>Twenty</MenuItem>
                <MenuItem value={30}>Thirty</MenuItem>
              </Select>
            </FormControl> */}
            
                {
                  loading ? (
                    <Holder/>
                  ) : (
                    
                <Table>
                  <thead className="MuiBox-root css-1ircn5c">
                    <tr className="MuiTableRow-root css-n3cyd2-MuiTableRow-root" role="row">
                      <th className="MuiBox-root css-1qbdd0n">
                        <div className="MuiBox-root css-1kcj9bb" colSpan="1" role="columnheader">
                          S/N
                        </div>
                      </th>
                      <th className="MuiBox-root css-1qbdd0n">
                        <div className="MuiBox-root css-1kcj9bb" colSpan="1" role="columnheader">
                          Business Name
                        </div>
                      </th>
                      <th className="MuiBox-root css-1qbdd0n">
                        <div className="MuiBox-root css-1kcj9bb" colSpan="1" role="columnheader">
                          Business Description
                        </div>
                      </th>
                      <th className="MuiBox-root css-1qbdd0n">
                        <div className="MuiBox-root css-1kcj9bb" colSpan="1" role="columnheader">
                         Business ID
                        </div>
                      </th>
                      <th className="MuiBox-root css-1qbdd0n">
                        <div className="MuiBox-root css-1kcj9bb" colSpan="1" role="columnheader">
                          Created Date
                        </div>
                      </th>
                      <th className="MuiBox-root css-1qbdd0n">
                        <div className="MuiBox-root css-1kcj9bb" colSpan="1" role="columnheader">
                          Status
                        </div>
                      </th>
                    </tr>
                  </thead>
                  <tbody className="MuiTableBody-root css-apqrd9-MuiTableBody-root">
                   {
                     businesses.map((user,index)=>{
                       return (
                         <tr className="MuiTableRow-root css-n3cyd2-MuiTableRow-root" role="row">
                           <td className="MuiBox-root css-15jcv17">
                              <div className="MuiBox-root css-ekdnj9">
                                <span className="MuiTypography-root MuiTypography-caption css-1da1bjc-MuiTypography-root">
                                  {index+1}
                                </span>
                              </div>
                            </td>
                            <td className="MuiBox-root css-15jcv17">
                              <div className="MuiBox-root css-ekdnj9">
                                <span className="MuiTypography-root MuiTypography-caption css-1da1bjc-MuiTypography-root">
                                  {user.name}
                                </span>
                              </div>
                            </td>
                            <td className="MuiBox-root css-15jcv17">
                              <div className="MuiBox-root css-ekdnj9">
                                <span className="MuiTypography-root MuiTypography-caption css-1da1bjc-MuiTypography-root">
                                  {user.description?user.description:'N/A'}
                                </span>
                              </div>
                            </td>
                            <td className="MuiBox-root css-15jcv17">
                              <div className="MuiBox-root css-ekdnj9">
                                <span className="MuiTypography-root MuiTypography-caption css-1da1bjc-MuiTypography-root">
                                  {user.businessId}
                                </span>
                              </div>
                            </td>
                            <td className="MuiBox-root css-15jcv17">
                              <div className="MuiBox-root css-ekdnj9">
                                <span className="MuiTypography-root MuiTypography-caption css-1da1bjc-MuiTypography-root">
                                  {moment(user.createdAt).format('LLLL')}
                                </span>
                              </div>
                            </td>
                            <td className="MuiBox-root css-15jcv17">
                              <div className="MuiBox-root css-ekdnj9">
                                <span className="MuiTypography-root MuiTypography-caption css-1da1bjc-MuiTypography-root">
                                {user.status==="active" ? "Active" : "Inactive"}
                                </span>
                              </div>
                            </td>
                            
                          </tr>
                       )
                     })
                     
                   }
                  </tbody>
                </Table>
                  )}
                  <ReactPaginate
              breakLabel="..."
              nextLabel={<i className="fa fa-angle-double-right"></i>}
              onPageChange={handlePageClick}
              pageRangeDisplayed={size}
              pageCount={pageCount}
              previousLabel={<i className="fa fa-angle-double-left"></i>}
              containerClassName="pagination"
              previousClassName="page-item"
              previousLinkClassName="page-link"
              nextClassName="page-item"
              nextLinkClassName="page-link"
              activeClassName="active"
              pageClassName="page-item"
              pageLinkClassName="page-link"
              renderOnZeroPageCount={false}
            />
              </Card>
            </Grid>
          </Grid>
          <div style={{display:'none'}}>
          <DataTable
          className="hidden"
            table={{ columns, rows }}
            showTotalEntries={false}
            isSorted={false}
            noEndBorder
            entriesPerPage={false}
            style={{"display":"none"}}
          />
          </div>
        </MDBox>
      </MDBox>
    </DashboardLayout>
  );
}

export default Users;
