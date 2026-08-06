export const dynamic = 'force-dynamic'

export default async function PlataformasBrutoPage() {
  const res = await fetch('https://www.infobetonline.com/api/plataformas', { cache: 'no-store' })
  const data = await res.json()
  
  return (
    <div className="p-8 bg-white min-h-screen">
      <h1 className="text-2xl font-bold mb-4">🔍 Datos en bruto desde la API</h1>
      <pre className="bg-gray-100 p-4 rounded border overflow-auto">
        {JSON.stringify(data, null, 2)}
      </pre>
    </div>
  )
}
