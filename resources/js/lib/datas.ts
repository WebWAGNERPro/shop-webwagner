import { useState, useEffect } from 'react';
import { Script } from '@/types';
const Datas = () => {
    const [scripts, setScripts] = useState<Script[]>([]);

    useEffect(() => {
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
        scripts
    }
}

export default Datas
