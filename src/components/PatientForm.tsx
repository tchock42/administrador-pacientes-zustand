import { toast } from 'react-toastify'
import { useForm} from 'react-hook-form'                            // importa el hook de validación
import Error from './Error'
import type { DraftPatient } from '../types'
import { usePatientStore } from '../store'                          // importación del hook del store creado con zustand
import { useEffect } from 'react'

export default function PatientForm() {
  
    const { addPatient, activeId, patients, updatePatient } = usePatientStore()    // extrae los action y states del store de zustand
    
    const { register, handleSubmit, formState: {errors}, reset, setValue } = useForm<DraftPatient>()  // extrae funciones de react-hook-form

    useEffect(() => {                                               // detectar el paciente para editar
        if(activeId){
            const activePatient = patients.filter(patient => patient.id === activeId)[0]    // filtra el paciente para editar
            // llenar el formulario
            setValue('name', activePatient.name)
            setValue('caretaker', activePatient.caretaker)
            setValue('email', activePatient.email)
            setValue('date', activePatient.date)
            setValue('symptoms', activePatient.symptoms)
        }
    }, [activeId]);

    // function para guardar un paciente o actualizarlo
    const registerPatient = (data: DraftPatient) => {
        if(activeId){
            updatePatient(data)         // actualiza el registro
            toast.success('Paciente actualizado correctamente')
        }else{
            addPatient(data)            // agrega nuevo registro
            toast.success('Paciente Registrado Correctamente')
        }   
        
        // resetear el formulario
        reset();
    }
    
    return (
      <div className="md:w-1/2 lg:w-2/5 mx-5">
          <h2 className="font-black text-3xl text-center">Seguimiento Pacientes</h2>
  
          <p className="text-lg mt-5 text-center mb-10">
              Añade Pacientes y {''}
              <span className="text-indigo-600 font-bold">Administralos</span>
          </p>
  
          <form 
              className="bg-white shadow-md rounded-lg py-10 px-5 mb-10"
              noValidate
              onSubmit={handleSubmit(registerPatient)}
          >
                <div className="mb-5">
                    <label htmlFor="name" className="text-sm uppercase font-bold">
                        Paciente 
                    </label>
                    <input                                                      // input del nombre de paciente
                        id="name"
                        className="w-full p-3  border border-gray-100"  
                        type="text" 
                        placeholder="Nombre del Paciente"   
                        {...register('name', {                                  // llamada a copia de register de react-hook-form
                            required: 'El nombre del paciente es obligatorio',  // error de obligatoriedad/
                        })}
                    />
                    {errors.name && (
                        <Error>{errors.name?.message}</Error>       // pasa el mensaje de error como children de <Error>
                    )}                    
                    
                </div>
  
                <div className="mb-5">
                    <label htmlFor="caretaker" className="text-sm uppercase font-bold">
                        Propietario 
                    </label>
                    <input  
                        id="caretaker"
                        className="w-full p-3  border border-gray-100"  
                        type="text" 
                        placeholder="Nombre del Propietario" 
                        {...register('caretaker', {                                 // llamada a copia de register de react-hook-form
                            required: 'El Nombre del Propietario es obligatorio',   // error de obligatoriedad
                        })}
                    />
                    {errors.caretaker && (
                        <Error>{errors.caretaker?.message}</Error>      // pasa el mensaje de error como children de <Error>
                    )}
                </div>
  
                <div className="mb-5">
                    <label htmlFor="email" className="text-sm uppercase font-bold">
                        Email 
                    </label>
                    <input  
                        id="email"
                        className="w-full p-3  border border-gray-100"  
                        type="email" 
                        placeholder="Email de Registro" 
                        {...register("email", {                                     // copia de register de react-hook-form
                            required: "El Email es Obligatorio",                    // error de obligatoriedad
                            pattern: {                                              // validación del patrón
                                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                message: 'Email No Válido'                          // error de patrón
                            }
                        })} 
                    />
                    {errors.email && (
                        <Error>{errors.email?.message}</Error>          // pasa el mensaje de error como children de <Error></Error>
                    )}
                </div>
  
                <div className="mb-5">
                    <label htmlFor="date" className="text-sm uppercase font-bold">
                        Fecha Alta 
                    </label>
                    <input  
                        id="date"
                        className="w-full p-3  border border-gray-100"  
                        type="date" 
                        {...register('date', {                                 // llamada a copia de register de react-hook-form
                            required: 'La fecha de alta es obligatoria',   // error de obligatoriedad
                        })}
                    />
                     {errors.date && (
                        <Error>{errors.date?.message}</Error>      // pasa el mensaje de error como children de <Error>
                    )}
                </div>
              
                <div className="mb-5">
                    <label htmlFor="symptoms" className="text-sm uppercase font-bold">
                    Síntomas 
                    </label>
                    <textarea  
                        id="symptoms"
                        className="w-full p-3  border border-gray-100"  
                        placeholder="Síntomas del paciente" 
                        {...register('symptoms', {                                  // llamada a copia de register de react-hook-form
                            required: 'Los síntomas son obligatorios',            // error de obligatoriedad
                        })}
                    />                                                              {/** no se coloca etiqueta de cierr para que funcione el ...register() */}
                    {errors.symptoms && (
                        <Error>{errors.symptoms?.message}</Error>       // pasa el mensaje de error como children de <Error>
                    )}
                </div>
  
                <input
                    type="submit"
                    className="bg-indigo-600 w-full p-3 text-white uppercase font-bold hover:bg-indigo-700 cursor-pointer transition-colors"
                    value='Guardar Paciente'
                />
          </form> 
      </div>
    )
  }