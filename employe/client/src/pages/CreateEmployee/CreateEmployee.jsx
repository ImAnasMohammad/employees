import React, { useEffect, useState } from 'react'
import NavBar from '../../components/NavBar'
import Input from '../../components/Input'
import Select from '../../components/Select'
import Radio from '../../components/Radio'
import Checkbox from '../../components/Checkbox'
import Button from '../../components/Button'
import Error from '../../components/Error'
import axios from 'axios';
import { useNavigate, useParams } from 'react-router'


const CreateEmployee = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [mobileNo, setMobileNo] = useState('');
  const [designation, setDesignation] = useState('');
  const [gender, setGender] = useState('');
  const [selectedCourses, setSelectedCourses] = useState([]);
  const [loadingData, setLoadingData] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [image, setImage] = useState(null);
  const redirect  = useNavigate();
  const {id}=useParams();

  const fetchUser = async (id)=>{
    setLoadingData(true)
    try{
      const res = await axios.get(`${process.env.REACT_APP_BASE_URL}/employee/${id}`);
      if(!res?.data?.employee){
        setError("Invalid id");
        return;
      }
      const {employee} = res?.data;
      console.log(employee)
      setName(employee.name)
      setEmail(employee.email)
      setMobileNo(employee.mobileNo)
      setDesignation(employee.designation)
      setGender(employee.gender)
      setSelectedCourses(employee.courses)
      setImage(employee.img);


    }catch(err){
      setError(err.message);
      console.log(err)
    }finally{
      setLoadingData(false)
    }
  }

  useEffect( ()=>{
    if(id){
      fetchUser(id);
    }
  },[])
  const onFileChange = (event) => {
    uploadFile(event.target.files[0]);
  };

  const uploadFile = async (file)=>{
    if (!file) {
      alert('Please select a file before uploading');
      return;
    }

    const formData = new FormData();
    formData.append('file', file);

    setUploading(true);

    try {
      const response = await axios.post(`${process.env.REACT_APP_BASE_URL}/upload`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });



      setImage(response.data.file.filename);
    } catch (error) {
      console.error('Error uploading file:', error);
      setImage({ error: 'File upload failed' });
    } finally {
      setUploading(false);
    }

  }

  const formData = ()=>{
    return {
      name,email,mobileNo,designation,gender,courses:selectedCourses,img:image
    }
  }


  const handleForm = async (e)=>{
    try{
      e.preventDefault();
      if(id){
        const res = await axios.put(`${process.env.REACT_APP_BASE_URL}/employee/${id}`,formData());
      }else{
        const res = await axios.post(`${process.env.REACT_APP_BASE_URL}/employee`,formData());
      }
      alert('Saved');
      redirect('/employees')
      setError(false)
    }catch(err){
      console.log(err)
      setError(err?.response?.data?.message ?? err?.message ?? 'Something went wrong.')
    }
  }

  return (
    <div>
      <NavBar />
      { loadingData?"Loading...":
        <div style={{ display: 'flex', justifyContent: 'center', paddingTop: '20px', gap: '60px', alignItems: 'center' }}>
        <form onSubmit={handleForm}>
        <div style={{ width: '400px', display: 'flex', gap: '20px', flexDirection: 'column' }}>
          <Input direction={'row'} value={name} onChange={(e)=>setName(e.target.value)}>Name</Input>
          <Input direction={'row'} value={email} onChange={(e)=>setEmail(e.target.value)}>Email</Input>
          <Input direction={'row'} value={mobileNo} onChange={(e)=>setMobileNo(e.target.value)}>Mobile Number</Input>
          <Select label="Select Designation" direction={'row'} value={designation} setValue={setDesignation}/>
          <Radio label="Gender" direction={'row'} selectedOption={gender} setSelectedOption={setGender} />
          <Checkbox selectedCourses={selectedCourses} setSelectedCourses={setSelectedCourses} label={'Select Course'} direction={"row"} />
          <div className='input-container' style={{ flexDirection: 'row' }}>
            <label htmlFor={'image'}>Upload Image </label>
            <Input onChange={onFileChange} accept="image/*" disabled={uploading} type="file"/>
          </div>
          {
            error && <Error>
              {error}
            </Error>
          }
          <Button type="submit" disabled={uploading || loading} >Submit</Button>
        </div>
        </form>
        {
          image &&
          <div style={{ width: '400px', height: '400px' }}>
            <img src={`${process.env.REACT_APP_BASE_URL}/upload/${image}`} style={{ height: '100%', width: '100%' }} />
          </div>
        }
      </div>
    }
    </div>
  )
}

export default CreateEmployee