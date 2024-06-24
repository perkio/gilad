import { signIn } from "../auth"
 
export function SignIn() {
  return (
    <form
      action={async () => {
        "use server"
        await signIn("google")
      }}
    >
      <button className="btn" type="submit">הזדהה עם Google</button>
    </form>
  )
} 
