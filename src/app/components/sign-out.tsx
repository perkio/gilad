import { signOut } from "../auth.ts"
 
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