import { create } from "zustand"                // importa la funcion create de zustand
import { devtools, persist } from 'zustand/middleware'     // instala la aplicación de devtools
import { DraftPatient, Patient } from "./types" // importación de types
import { v4 as uuidv4} from 'uuid'

type PatientState = {                           // creacion del type del store
    patients: Patient[]                         // array de tipo PAtient
    activeId: Patient['id']                     // id activo para editar
    addPatient: (data: DraftPatient) => void    // ACTION type de addPAtient que usa un tipo DraftPatient
    deletePatient: (id: Patient['id']) => void  // action para eliminar
    getPatientById: (id: Patient['id']) => void // action para setear el id del paciente a eliminar
    updatePatient: (id: DraftPatient) => void   // action para actualizar el paciente
}

// funcion para agregar el id de un DraftPatient a un Patient
const createPatient = (patient: DraftPatient) : Patient => {
    return {
        ...patient, id: uuidv4()
    }
}

export const usePatientStore = create<PatientState>()(                      // declaracion de la función create de zustand para crear el hook usePatientStore
    devtools(                                                               // funcion de redux devtools
        persist(                                                            // funcion de almacenamiento en LocalStorage o session storage
            (set) => ({                                                     // funcion set
                patients: [],                                               // STATE de pacientes valor inicial
                activeId: '',                                               // valor inicial de activeId para editar paciente
                addPatient: (data) => {                                     // primer action setdeclaracion del ACTION addPAtient

                    const newPatient = createPatient(data)                  // crea un paciente de tipo Patient con id a partir de un DraftPatient

                    set( (state) => ({                                      // toma el state global
                        patients: [...state.patients, newPatient]           // agrega la copia de pacientes y el data
                    }))
                },
                deletePatient: (id) => {
                    set( (state) => ({
                        patients: state.patients.filter( patient => patient.id !== id)  // pasa los id diferentes al que se desea eliminar
                    }))
                },          
                getPatientById: (id) => {                                               // guarda el id del paciente que se va a actualizar
                    
                    set( () => ({
                        activeId: id
                    })) 
                },
                updatePatient: (data) => {                                              // actualiza el paciente
                    set((state) => ({
                        // cuando se encuentra el paciente a editar, agrega el id y actualiza con data
                        patients: state.patients.map( patient => patient.id === state.activeId ? {id: state.activeId, ...data} : patient),
                        activeId: ''
                    }))         
                }
            }), {
                name: 'patient-storage',                                    // guarda en LS
            }
        )
    )
)