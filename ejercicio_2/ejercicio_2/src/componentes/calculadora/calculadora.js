import {useState} from 'react';
import './calculadora.css'
import Resultado from './resultado'

const Calculadora = (props) => {

    const [A, setA] = useState(0);
    const [B, setB] = useState(0);
    const [op, setOp] = useState(() => (a, b) => a + b);


    return(
        <div className='calculadora'>
            <div className='calculadora_2'>
            <form>
                <div>
                    <label>A: </label>
                    <input onChange={(e) => setA(Number.parseInt(e.target.value))} type='number' value={A} />
                </div>
                <div>
                    <label>B: </label>
                    <input onChange={(e) => setB(Number.parseInt(e.target.value))} type='number'  value={B} />
                </div>
                <div>Operación seleccionada: {op.toString()}</div>
                <div>
                <button className='button' onClick={(e) => { e.preventDefault(); setOp(() => (a,b) => a+b)}}>+</button>
                <button className='button' onClick={(e) => { e.preventDefault(); setOp(() => (a,b) => a-b)}}>-</button>
                <button className='button' onClick={(e) => { e.preventDefault(); setOp(() => (a,b) => a*b)}}>*</button>
                <button className='button' onClick={(e) => { e.preventDefault(); setOp(() => (a,b) => a/b)}}>/</button>
                </div>
            </form>
            </div>
            <Resultado resultado={op(A,B).toFixed(2).toString()} />
        </div>
    )
}

export default Calculadora;