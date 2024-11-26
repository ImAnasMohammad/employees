import React, { useEffect, useState } from 'react'
import NavBar from '../../components/NavBar'
import Button from '../../components/Button'
import './Employees.css'
import { Link, redirect, useNavigate } from 'react-router'
import Input from '../../components/Input'
import axios from 'axios'


const Employees = () => {

    const [rows,setRows]=useState([]);
    const [loading,setLoading]=useState(false);
    const [currentPage,setCurrentPage] = useState(1);
    const [total,setTotal] = useState(0);
    const [totalPages,setTotalPages] = useState(0);
    const [pageSize,setPageSize] = useState(0);

    const redirect = useNavigate();


    const handleClick = ()=>{

    }

    const fetchData = async (url=`${process.env.REACT_APP_BASE_URL}/employee`)=>{

        try{
            setLoading(true);
            const res = await axios.get(url);

            const {totalEmployees,page,totalPages,pageSize} = res?.data?.pagination

            setTotal(totalEmployees);
            setCurrentPage(page);
            setTotalPages(totalPages);
            setPageSize(pageSize);
            setRows([...res?.data?.employees])
                
            console.log(res);

        }catch(err){
            alert(err.message);
        }finally{
            setLoading(false)
        }
    }

    useEffect(()=>{
        fetchData()
    },[])

    return (
      <div className='dashboard-wrapper'>
        <NavBar/>
        <div style={{padding:'10px',display:'flex',justifyContent:'space-between'}}>
            <span>Employee list</span>
            <Button style={{padding:'10px 20px',fontSize:'1rem'}} onClick={()=>redirect('/save')} >Create Employee</Button>
        </div>
        <div style={{padding:'10px',display:'flex',justifyContent:'space-between', alignItems:'center'}}>
            <span>Total count:- {total}</span>
            <div style={{width:'500px'}}>
                <Input direction={'row'} style={{flex:'1 1 auto'}}>Search</Input>
            </div>
        </div>
        <ShowTableData handleClick={handleClick} rows={rows} setRows={setRows}/>
      </div>
    )

}


const ShowTableData = ({handleClick,rows,setRows})=>{
    const deleteRow = async (id)=>{
        try{
            const res = await axios.delete(`${process.env.REACT_APP_BASE_URL}/employee/delete/${id}`);

            setRows([...rows?.filter(item=>item?._id!==id)]);
            alert("Delete success.")

        }catch(err){
            console.log(err)
            alert(err.message);
        }
    }
    return(
        <table className='table'>
            <thead>
                <tr>
                    <td><span>Id</span></td>
                    <td><span>Image</span></td>
                    <td><span onClick={()=>handleClick()}>Name</span></td>
                    <td><span onClick={()=>handleClick()}>Email</span></td>
                    <td>Mobile No</td>
                    <td>Designation</td>
                    <td>gender</td>
                    <td>Course</td>
                    <td><span onClick={()=>handleClick()}>Create date</span></td>
                    <td>Action</td>
                </tr>
            </thead>
            <tbody>
                {
                    rows?.map(row=><tr>
                        <td><span>{row?._id}</span></td>
                        <td><div style={{width:'100px',height:'100px'}}><img style={{height:'100%',width:'100%'}} src={`${process.env.REACT_APP_BASE_URL}/upload/${row?.img}`}/></div></td>
                        <td><span>{row?.name}</span></td>
                        <td><span>{row?.email}</span></td>
                        <td>{row?.mobileNo}</td>
                        <td>{row?.designation}</td>
                        <td>{row?.gender}</td>
                        <td>
                            <ul>
                                {
                                    row?.courses?.map(item=><li>{item}</li>)
                                }
                            </ul>

                        </td>
                        <td>{row?.createdAt}</td>
                        <td>
                            <div style={{display:'flex',gap:'10px'}}>
                                <Link to={`/save/${row?._id}`}>Edit</Link>
                                <Link onClick={()=>deleteRow(row?._id)}>Delete</Link>
                            </div>
                        </td>
                    </tr>)
                }
            </tbody>
        </table>
    )
}

export default Employees