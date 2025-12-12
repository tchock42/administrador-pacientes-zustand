import { ToastContainer } from "react-toastify"
import PatientForm from "./components/PatientForm"
import PatientList from "./components/PatientList"
import "react-toastify/dist/ReactToastify.css" 


const App = () => {
  return (
    <>
      <div className="container mx-auto mt-20">
        <h1 className="font-black text-5xl text-center md:w-2/3 md:mx-auto">    {/** ocupa 2/3 en x en 768px centrado */}
          Seguimiento de Pacientes {''}
          <span className="text-indigo-700">Veterinaria</span>
        </h1>

      
        <div className="mt-12 md:flex">                                           {/** activa flex */}
          <PatientForm/>
          <PatientList/>
        </div>
      </div>
      <ToastContainer/>
    </>
  )
}

export default App
