import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { Eye, EyeOff } from "lucide-react";

export function PasswordInput({
  id = "password",
  className,
  register,
  errors,
}) {
  const [password, setPassword] = useState("");
  const [strength, setStrength] = useState(0);
  const [showPassword, setShowPassword] = useState(false);
  
  const [hasUppercase, setHasUppercase] = useState(false);
  const [hasLowercase, setHasLowercase] = useState(false);
  const [hasNumbers, setHasNumbers] = useState(false);
  const [hasSymbols, setHasSymbols] = useState(false);
  const [hasMinLength, setHasMinLength] = useState(false);  

  const { onChange: registerOnChange, ...rest } = register("password");

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
    registerOnChange(e);
  };

  useEffect(() => {
    setHasUppercase(/[A-Z]/.test(password));
    setHasLowercase(/[a-z]/.test(password));
    setHasNumbers(/[0-9]/.test(password));
    setHasSymbols(/[^A-Za-z0-9]/.test(password));
    setHasMinLength(password.length >= 8);
    
    const criteriaMet = [hasUppercase, hasLowercase, hasNumbers, hasSymbols, hasMinLength].filter(Boolean).length;
    
    if (hasUppercase && hasLowercase && hasNumbers && hasMinLength) {
      setStrength(100);
    } else if (criteriaMet >= 3) {
      setStrength(60);
    } else {
      setStrength(20);
    }
  }, [password, hasUppercase, hasLowercase, hasNumbers, hasSymbols, hasMinLength]);

  const getStrengthColor = () => {
    if (strength <= 30) return "bg-red-500";
    if (strength <= 70) return "bg-yellow-500";
    return "bg-green-500";
  };

  const getStrengthText = () => {
    if (strength <= 30) return "Weak";
    if (strength <= 70) return "Medium";
    return "Strong";
  };

  return (
    <div className={cn("grid gap-2", className)}>
      <Label htmlFor={id} className={`${errors?.password ? "text-red-500" : ""}`}>Password</Label>
      
      <div className="relative">
        <Input
          id={id}
          type={showPassword ? "text" : "password"}
          placeholder="********"
          className={`${errors?.password ? "border-red-500 focus:outline-none focus-visible:ring-0" : ""}`}
          onChange={handlePasswordChange}
          {...rest}
        />
        <button
          type="button"
          className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700 focus:outline-none"
          onClick={() => setShowPassword(!showPassword)}
          tabIndex="-1"
        >
          {showPassword ? (
            <EyeOff className="h-4 w-4" />
          ) : (
            <Eye className="h-4 w-4" />
          )}
        </button>
      </div>
      
      {errors?.password && (
        <span className="text-red-500 text-xs font-medium">{errors.password.message}</span>
      )}
      
      {password && password.length > 0 && (
        <div className="space-y-2 mt-1">
          <Progress 
            value={strength} 
            className={cn("h-1 w-full", getStrengthColor())} 
          />
          
          <div className="text-xs text-right font-medium">
            {getStrengthText()}
          </div>
        </div>
      )}
    </div>
  );
}