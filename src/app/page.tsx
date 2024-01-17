"use client"
import { ChangeEvent, FormEvent, useEffect, useState } from "react"
import { database } from "../../service/firebase"
import  inst from '@/../public/Group 14.svg'
import  cans from '@/../public/Group 15.svg'
import  oss from '@/../public/Group 16.svg'
import  edit from '@/../public/Group 17.svg'
import Image from "next/image"

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
};

  return (
    <main className=" bg-[#E8E8E8]relative">
      {atualizando ? 
        <form className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50 flex flex-col gap-9 bg-slate-100 p-12 rounded-xl" onSubmit={handleSave}>
          <button className="absolute top-3 right-3 text-red-600 font-bold" onClick={editar}>X</button>
          <input
            name="instaladas"
            placeholder="Instaladas"
            className="text-black py-2 text-center bg-slate-100 border-b-2 border-slate-950 outline-none"
            value={formData.instaladas}
            onChange={handleChange}
          />
          <input
            name="canceladas"
            placeholder="Canceladas"
            className="text-black py-2 text-center bg-slate-100 border-b-2 border-slate-950 outline-none"
            value={formData.canceladas}
            onChange={handleChange}
          />
          <input
            name="os"
            placeholder="OS"
            className="text-black py-2 text-center bg-slate-100 border-b-2 border-slate-950 outline-none"
            value={formData.os}
            onChange={handleChange}
          />
            <button className="bg-green-600 rounded-xl text-white font-bold"  type="submit">Salvar</button>
        </form> : <button className="absolute top-4 right-4 bg-[#FFC700] text-[#5F4A00] font-bold p-3 rounded-2xl flex items-center gap-4" onClick={editar}>EDITAR<Image src={edit} alt={""} className="w-8" /></button>
        }
        <div className="flex gap-28 justify-center h-screen items-center max-md:gap-20 max-[650px]:gap-14 max-[660px]:hidden">
          <div className=" text-white flex flex-col justify-center items-center relative ">
            <Image src={inst} alt={""}  />
            <div className=" absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex items-center justify-center flex-col gap-6 ">
              <h2 className="text-4xl font-bold text-[#335F28] max-md:text-3xl ">Instaladas</h2>
              <p className="text-9xl font-bold text-[#335F28] max-md:text-7xl ">{instaladas}</p>
            </div>
          </div>

          <div className=" text-white flex flex-col justify-center items-center relative max-[660px]:hidden">
            <Image src={cans} alt={""}  />
            <div className=" absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex items-center justify-center flex-col gap-6 ">
              <h2 className="text-4xl font-bold text-[#6C1111] max-md:text-3xl ">Canceladas</h2>
              <p className="text-9xl font-bold text-[#6C1111] max-md:text-7xl ">{canceladas}</p>
            </div>
          </div>

          <div className=" text-white flex flex-col justify-center items-center relative max-[660px]:hidden">
            <Image src={oss} alt={""}  />
            <div className=" absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex items-center justify-center flex-col gap-6 ">
              <h2 className="text-4xl font-bold text-[#6C6314] max-md:text-3xl ">0.S</h2>
              <p className="text-9xl font-bold text-[#6C6314] max-md:text-7xl">{os}</p>
            </div>
          </div>
         
        </div>
    </main>
  )
}
