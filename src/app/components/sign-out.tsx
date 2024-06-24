import { signOut } from "../auth"
 
export function SignOut() {
  return (
    <form
      action={async () => {
        "use server"
        await signOut()
      }}
    >
      <button className="btn" type="submit">התנתק</button>
    </form>
  )
}