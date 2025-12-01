import { useParams } from "react-router"

export default function DetalhesDeEvento() {
    const id = (useParams() as {id: string}).id
    return (
        <div>eventoid: {id}</div>
    )
}