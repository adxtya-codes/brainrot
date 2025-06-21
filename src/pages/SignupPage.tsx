
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';

const SignupPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [name, setName] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);
  const [signupSuccess, setSignupSuccess] = useState<boolean>(false);
  
  const { signup } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();

  // Redirect to home after successful signup and verification
  React.useEffect(() => {
    if (signupSuccess) {
      // Give user a moment to see the message
      setTimeout(() => {
        navigate('/');
      }, 2000);
    }
  }, [signupSuccess, navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError(null);
    if (password !== confirmPassword) {
      setFormError('Passwords do not match.');
      return;
    }
    setIsLoading(true);

    try {
      const result = await signup(email, password, name);
      if (result.success) {
        setSignupSuccess(true);
      } else {
        setFormError(result.error || 'Signup failed.');
      }
    } catch (error) {
      setFormError('Something went wrong. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-2 py-8 bg-background">
      <div className="w-full max-w-md mx-auto bg-white dark:bg-zinc-900 rounded-xl shadow-lg p-6 space-y-8">
        <div className="text-center">
          <h1 className="text-3xl font-bold">We gonna have to send you a link via mail to verify!</h1>
          <p className="text-muted-foreground mt-2">
            Create your brainrot account!
          </p>
        </div>

        {signupSuccess ? (
          <div className="bg-black text-white rounded-lg px-4 py-5 text-base text-center border border-zinc-800 mt-4">
            <span className="font-semibold block mb-2">Check your email!</span>
            A verification link has been sent to <span className="underline">{email}</span>.<br/>
            Please click the link in your inbox to activate your account.<br/>
            <a
              href={`https://mail.google.com/mail/u/0/#search/${encodeURIComponent(email)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block mt-4 px-4 py-2 bg-white text-black rounded-lg font-semibold border border-zinc-800 hover:bg-zinc-100 transition"
            >
              Open Gmail
            </a>
          </div>
        ) : (
          <React.Fragment>
            {formError && (
              <div className="bg-black text-white rounded-lg px-4 py-3 text-sm text-center mb-2 border border-zinc-800">
                {formError}
              </div>
            )}
            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <Label htmlFor="name">Name</Label>
                <Input
                  id="name"
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  className="mt-1"
                  autoComplete="name"
                />
              </div>

              <div>
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="mt-1"
                  autoComplete="email"
                />
              </div>

              <div>
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="mt-1"
                  autoComplete="new-password"
                  minLength={6}
                />
              </div>

              <div>
                <Label htmlFor="confirmPassword">Confirm Password</Label>
                <Input
                  id="confirmPassword"
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                  className="mt-1"
                  autoComplete="new-password"
                  minLength={6}
                />
              </div>

              <Button
                type="submit"
                className="w-full h-12 rounded-lg font-semibold text-base"
                disabled={isLoading}
              >
                {isLoading ? 'Creating account...' : 'Create Account'}
              </Button>
            </form>

            <div className="text-center">
              <p className="text-sm text-muted-foreground">
                Already have an account?{' '}
                <Link to="/login" className="underline hover:text-primary">
                  Sign in
                </Link>
              </p>
            </div>
          </React.Fragment>
        )}
      </div>
    </div>
  );
};

export default SignupPage;
