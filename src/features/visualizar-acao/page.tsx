import { useParams } from "react-router"

export default function VisualizarAcaoPage() {
    const id = (useParams() as {id: string}).id
    return (
        <div>eventoid: {id}</div>
    )
}