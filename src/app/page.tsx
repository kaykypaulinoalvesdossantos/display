"use client"
import { ChangeEvent, FormEvent, useEffect, useState } from "react"
import { database } from "../../service/firebase"

type Contato = {
  Instaladas: string,
  Canceladas: string,
  OS: string,
}

export default function Home() {

  const chave = "-NoB1VUpgAZpp6ZlW1Jc"

  const [instaladas , setInstaladas] = useState("00")
  const [canceladas , setCanceladas] = useState("00")
  const [os , setOs] = useState("00")

  const [formData, setFormData] = useState({
    instaladas: '00',
    canceladas: '00',
    os: '00',
  })

  const[atualizando , setAtualizando] = useState(false)

// Atualizar dados 

useEffect(() => {
  const refContatos = database.ref('Valores');
  refContatos.on('value', (resultado) => {
    const resultadoContatos = Object.entries<Contato>(resultado.val() ?? {}).map(([chave, valor]) => ({
      chave,
      Instaladas: setInstaladas(valor.Instaladas),
      Canceladas: setCanceladas(valor.Canceladas),
      OS: setOs(valor.OS),
    }));
  });
}, []);

// Editar

function atualizarcontato(){
 const ref = database.ref('Valores')
 const dados = {
  'Instaladas': formData.instaladas,
  'Canceladas': formData.canceladas,
  'OS': formData.os,
 }
 ref.child(chave).update(dados)
setAtualizando(false)
}


function editar(event : FormEvent){
  setAtualizando(!atualizando)
  event.preventDefault()
}

const handleChange = (e : ChangeEvent<HTMLInputElement>) => {
  const { name , value  } = e.target;
  setFormData((prevData) => ({ ...prevData, [name]: value }));
};

const handleSave = (e :FormEvent) => {
  e.preventDefault();
  atualizarcontato()
  // Adicione lógica adicional de salvamento aqui, como enviar os dados para um servidor
};

  return (
    <main className="h-screen justify-center items-center text-center flex bg-sky-800 relative">
      {atualizando ? 
        <form className="absolute z-50 flex flex-col gap-9 bg-slate-100 p-12 rounded-xl" onSubmit={handleSave}>
          <button className="absolute top-3 right-3 text-red-600 font-bold" onClick={editar}>X</button>
          <input
            name="instaladas"
            placeholder="Instaladas"
            className="text-black py-2 text-center bg-slate-100 border-b-2 border-slate-950"
            value={formData.instaladas}
            onChange={handleChange}
          />
          <input
            name="canceladas"
            placeholder="Canceladas"
            className="text-black py-2 text-center bg-slate-100 border-b-2 border-slate-950"
            value={formData.canceladas}
            onChange={handleChange}
          />
          <input
            name="os"
            placeholder="OS"
            className="text-black py-2 text-center bg-slate-100 border-b-2 border-slate-950"
            value={formData.os}
            onChange={handleChange}
          />
            <button className="bg-green-600 rounded-xl text-white font-bold"  type="submit">Salvar</button>
        </form> : <button className="absolute top-4 right-4 bg-amber-400 text-green-950 font-bold p-3 rounded-full" onClick={editar}>Editar</button>
        }
        <div className="flex space-x-10 ">
          <div className="bg-black text-white p-5 flex flex-col justify-center items-center gap-8 rounded-xl drop-shadow-2xl">
            <h2 className="text-8xl">Instaladas</h2>
            <p className="text-7xl">{instaladas}</p>
          </div>
          <div className="bg-black text-white p-5 flex flex-col justify-center items-center gap-8 rounded-xl drop-shadow-2xl">
            <h2 className="text-8xl">Canceladas</h2>
            <p className="text-7xl">{canceladas}</p>
          </div>
          <div className="bg-black text-white p-5 flex flex-col justify-center items-center gap-8 rounded-xl drop-shadow-2xl">
            <h2 className="text-8xl">OS</h2>
            <p className="text-7xl">{os}</p>
          </div>
        </div>
    </main>
  )
}
