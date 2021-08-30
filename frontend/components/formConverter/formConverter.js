import {useAppContext} from "../../context/state";

export default function FormConverter()
{
    const registerUser = async event => {
        event.preventDefault()

        const res = await fetch('/api/register', {
            body: JSON.stringify({
                name: event.target.name.value
            }),
            headers: {
                'Content-Type': 'application/json'
            },
            method: 'POST'
        })

        const result = await res.json()
        // result.user => 'Ada Lovelace'
    }

    const [context, setContext] = useAppContext();

    return (
        <form onSubmit={registerUser}>
            <label htmlFor="amount">Amount</label>
            <input id="amount" name="amount" type="text" autoComplete="amount" required />
            <button type="submit">Register</button>
            {context.selectedDate.toISOString().slice(0,10)}
        </form>
    )
}
