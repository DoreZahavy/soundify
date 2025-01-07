import { useState, useEffect } from 'react'

export function SearchBar({ filterBy, setFilterBy }) {
    const [ filterToEdit, setFilterToEdit ] = useState(structuredClone(filterBy))

    useEffect(() => {
        setFilterBy(filterToEdit)
    }, [filterToEdit])

    function handleChange(ev) {
        const type = ev.target.type
        const field = ev.target.name
        let value

        switch (type) {
            case 'text':
            case 'radio':
                value = field === 'sortDir' ? +ev.target.value : ev.target.value
                if(!filterToEdit.sortDir) filterToEdit.sortDir = 1
                break
            case 'number':
                value = +ev.target.value || ''
                break
        }
        setFilterToEdit({ ...filterToEdit, [field]: value })
    }

    function clearFilter() {
        setFilterToEdit({ ...filterToEdit, txt: ''})
    }
    
  

    return <section className="car-filter">
            <h3>Filter:</h3>
            <input
                type="text"
                name="txt"
                value={filterToEdit.txt}
                placeholder="Free text"
                onChange={handleChange}
                required
            />
            <button 
                className="btn-clear" 
                onClick={clearFilter}>Clear</button>


    </section>
}