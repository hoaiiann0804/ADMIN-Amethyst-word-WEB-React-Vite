import React, { useRef, useState } from "react"
import { Toast } from "primereact/toast"
import { useMountEffect } from "primereact/hooks"
import { useNavigate } from "react-router-dom"
import { clsx } from "clsx"
import { Button } from "@/components/ui/Button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/Card"
import { Input } from "@/components/ui/Input"
import { Label } from "@/components/ui/Label"

const Login = () => {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const toast = useRef(null)
  const navigate = useNavigate()

  useMountEffect(() => {
    if (toast.current) {
      toast.current.show({ severity: "info", detail: "Login page loaded", sticky: true })
    }
  })

  const handleSubmit = (e) => {
    e.preventDefault()

    if (!username || !password) {
      toast.current?.show({
        severity: "warn",
        summary: "Missing fields",
        detail: "Please enter both email and password.",
        life: 3000,
      })
      return
    }

    // Giả lập kiểm tra đăng nhập
    if (username === "admin@gmail.com" && password === "12345") {
        const userData = { name: "Admin", email: username };
        localStorage.setItem("user", JSON.stringify(userData));

      toast.current?.show({
        severity: "success",
        summary: "Success",
        detail: "Login successful",
        life: 3000,
      })

      navigate("/")
    } else {
      toast.current?.show({
        severity: "error",
        summary: "Error",
        detail: "Invalid credentials",
        life: 3000,
      })
    }
  }

  return (
    <div className={clsx("min-h-screen flex items-center justify-center bg-gray-100")}>
      <Toast ref={toast} />
      <div className="flex flex-col gap-6 w-full max-w-md">
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl">Login</CardTitle>
            <CardDescription>
              Enter your email below to login to your account
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="flex flex-col gap-6">
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="m@example.com"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
              </div>
              <div className="grid gap-2">
                <div className="flex items-center">
                  <Label htmlFor="password">Password</Label>
                  <a
                    href="#"
                    className="ml-auto inline-block text-sm underline-offset-4 hover:underline"
                  >
                    Forgot your password?
                  </a>
                </div>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <Button type="submit" className="w-full bg-violet-400">
                Login
              </Button>
              <Button type="button" variant="outline" className="w-full">
                Login with Google
              </Button>
            </form>
            <div className="mt-4 text-center text-sm">
              Don&apos;t have an account?{" "}
              <a href="#" className="underline underline-offset-4">
                Sign up
              </a>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

export default Login