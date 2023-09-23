import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getAllEmployees } from '../../redux/homeSlice'


const Home = () => {
  const dispatch = useDispatch()
  const { isLoading, employees } = useSelector(state => state.home)
  const [isInitialLoad, setIsInitialLoad] = useState(true)
  useEffect(() => {
    if (isInitialLoad && employees.length === 0) {
      dispatch(getAllEmployees());
      setIsInitialLoad(false);
    }
  }, [isInitialLoad, dispatch]);
  return (
    <div>Home</div>
  )
}

export default Home