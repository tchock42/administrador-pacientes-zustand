import { usePatientStore } from "../store"                          // importa hook de store de zustand
import PatientDetails from "./PatientDetails"

const PatientList = () => {

    const patients = usePatientStore(state => state.patients)       // extrae array patients del store | segunda sintaxis
  
    return (
        <div className="md:w-1/2 lg:w-3/5 md:h-screen overflow-y-scroll"> {/** width: 50% a768px, width: 60% a1024px, height:100vh a 768px, overflow-y: scroll */}
            {patients.length ? (
                <>
                    <h2 className="font-black text-3xl text-center">Listado de Pacientes</h2>
                    <p className="text-xl mt-5 mb-10 text-center">
                        Administra tus {''}
                        <span className="text-indigo-600 font-bold">Pacientes y Citas</span>
                    </p>
                    {patients.map( patient => (                             //itera sobre el array de pacientes
                        <PatientDetails         
                            key={patient.id}
                            patient={patient}
                        />
                    ))}
                </>
            ) : (
                <>
                    <h2 className="font-black text-3xl text-center">No hay pacientes</h2>
                    <p className="text-xl mt-5 text-center">
                        Comienza agregando pacientes {''}
                        <span className="text-indigo-600 font-bold">y aparecerán en este lugar.</span>
                    </p>
                </>
            )}
        </div>
    )
}

export default PatientList
