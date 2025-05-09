import { Script } from '@/types';
import React from 'react'
const Datas = () => {
    const [scripts, setScripts] = React.useState<Script[]>([])

    React.useEffect(() => {
        fetch('/api/scripts')
            .then((response) => response.json())
            .then((data) => {
                setScripts(data)
            })
            .catch((error) => {
                console.error('Error fetching scripts:', error)
            })
    }, [])

    return {
        scripts: scripts
    }
}

export default Datas
