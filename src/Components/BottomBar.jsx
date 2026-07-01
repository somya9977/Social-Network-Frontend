import { Home, PlusSquare,MessageCircle, Heart, User } from "lucide-react"
import { NavLink } from "react-router-dom"

const navItems = [
  { to: "/home", icon: Home, label: "Home" },

  { to: "/create-post", icon: PlusSquare, label: "Add" },
  { to: "/messages", icon: MessageCircle, label: "Notifications" },
  { to: "/profile", icon: User, label: "Profile" },
]

const BottomBar = () => {
  return (
    <div className="fixed bottom-0 left-0 w-full bg-slate-950 border-t border-slate-800 flex justify-around items-center h-14 z-50">
      {navItems.map(({ to, icon: Icon, label }) => (
        <NavLink
          key={to}
          to={to}
          className={({ isActive }) =>
            `flex flex-col items-center justify-center gap-0.5 transition ${
              isActive ? "text-white" : "text-slate-500"
            }`
          }
        >
          {({ isActive }) => (
            <Icon
              size={22}
              className={isActive ? "fill-white" : ""}
              strokeWidth={isActive ? 2.2 : 1.8}
            />
          )}
        </NavLink>
      ))}
    </div>
  )
}

export default BottomBar