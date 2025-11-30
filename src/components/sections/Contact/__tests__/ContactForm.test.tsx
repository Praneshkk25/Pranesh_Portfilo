import { describe, it, expect, beforeEach, vi } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ContactForm, FormData } from '../ContactForm';

// Mock framer-motion
vi.mock('framer-motion', () => ({
  motion: {
    div: ({ children, ...props }: any) => <div {...props}>{children}</div>,
    form: ({ children, ...props }: any) => <form {...props}>{children}</form>,
    span: ({ children, ...props }: any) => <span {...props}>{children}</span>,
  },
  AnimatePresence: ({ children }: any) => <>{children}</>,
}));

describe('ContactForm', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('Rendering', () => {
    it('should render contact form', () => {
      render(<ContactForm />);
      
      expect(screen.getByText('Send a Message')).toBeInTheDocument();
      expect(screen.getByLabelText(/name/i)).toBeInTheDocument();
      expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
      expect(screen.getByLabelText(/subject/i)).toBeInTheDocument();
      expect(screen.getByLabelText(/message/i)).toBeInTheDocument();
    });

    it('should render submit button', () => {
      render(<ContactForm />);
      
      const submitButton = screen.getByRole('button', { name: /send message/i });
      expect(submitButton).toBeInTheDocument();
    });

    it('should render form description', () => {
      render(<ContactForm />);
      
      expect(screen.getByText(/fill out the form below/i)).toBeInTheDocument();
    });

    it('should render character count for message field', () => {
      render(<ContactForm />);
      
      expect(screen.getByText('0/1000')).toBeInTheDocument();
    });

    it('should apply custom className', () => {
      const { container } = render(<ContactForm className="custom-class" />);
      
      expect(container.firstChild).toHaveClass('custom-class');
    });
  });

  describe('Form Field Validation', () => {
    describe('Name Field', () => {
      it('should show error when name is empty on blur', async () => {
        const user = userEvent.setup();
        render(<ContactForm />);

        const nameInput = screen.getByLabelText(/name/i);
        await user.click(nameInput);
        await user.tab();

        await waitFor(() => {
          expect(screen.getByText('Name is required')).toBeInTheDocument();
        });
      });

      it('should show error when name is too short', async () => {
        const user = userEvent.setup();
        render(<ContactForm />);

        const nameInput = screen.getByLabelText(/name/i);
        await user.type(nameInput, 'A');
        await user.tab();

        await waitFor(() => {
          expect(screen.getByText('Name must be at least 2 characters')).toBeInTheDocument();
        });
      });

      it('should not show error for valid name', async () => {
        const user = userEvent.setup();
        render(<ContactForm />);

        const nameInput = screen.getByLabelText(/name/i);
        await user.type(nameInput, 'John Doe');
        await user.tab();

        await waitFor(() => {
          expect(screen.queryByText(/name/i)).not.toHaveTextContent('required');
        });
      });

      it('should clear error when valid input is entered', async () => {
        const user = userEvent.setup();
        render(<ContactForm />);

        const nameInput = screen.getByLabelText(/name/i);
        await user.click(nameInput);
        await user.tab();

        await waitFor(() => {
          expect(screen.getByText('Name is required')).toBeInTheDocument();
        });

        await user.clear(nameInput);
        await user.type(nameInput, 'John Doe');

        await waitFor(() => {
          expect(screen.queryByText('Name is required')).not.toBeInTheDocument();
        });
      });
    });

    describe('Email Field', () => {
      it('should show error when email is empty on blur', async () => {
        const user = userEvent.setup();
        render(<ContactForm />);

        const emailInput = screen.getByLabelText(/email/i);
        await user.click(emailInput);
        await user.tab();

        await waitFor(() => {
          expect(screen.getByText('Email is required')).toBeInTheDocument();
        });
      });

      it('should show error for invalid email format', async () => {
        const user = userEvent.setup();
        render(<ContactForm />);

        const emailInput = screen.getByLabelText(/email/i);
        await user.type(emailInput, 'invalid-email');
        await user.tab();

        await waitFor(() => {
          expect(screen.getByText('Please enter a valid email address')).toBeInTheDocument();
        });
      });

      it('should accept valid email format', async () => {
        const user = userEvent.setup();
        render(<ContactForm />);

        const emailInput = screen.getByLabelText(/email/i);
        await user.type(emailInput, 'test@example.com');
        await user.tab();

        await waitFor(() => {
          expect(screen.queryByText('Please enter a valid email address')).not.toBeInTheDocument();
        });
      });

      it('should validate various email formats', async () => {
        const user = userEvent.setup();
        const validEmails = [
          'user@example.com',
          'user.name@example.com',
          'user+tag@example.co.uk',
        ];

        for (const email of validEmails) {
          const { unmount } = render(<ContactForm />);
          const emailInput = screen.getByLabelText(/email/i);
          
          await user.type(emailInput, email);
          await user.tab();

          await waitFor(() => {
            expect(screen.queryByText('Please enter a valid email address')).not.toBeInTheDocument();
          });

          unmount();
        }
      });
    });

    describe('Subject Field', () => {
      it('should show error when subject is empty on blur', async () => {
        const user = userEvent.setup();
        render(<ContactForm />);

        const subjectInput = screen.getByLabelText(/subject/i);
        await user.click(subjectInput);
        await user.tab();

        await waitFor(() => {
          expect(screen.getByText('Subject is required')).toBeInTheDocument();
        });
      });

      it('should show error when subject is too short', async () => {
        const user = userEvent.setup();
        render(<ContactForm />);

        const subjectInput = screen.getByLabelText(/subject/i);
        await user.type(subjectInput, 'Hi');
        await user.tab();

        await waitFor(() => {
          expect(screen.getByText('Subject must be at least 5 characters')).toBeInTheDocument();
        });
      });

      it('should accept valid subject', async () => {
        const user = userEvent.setup();
        render(<ContactForm />);

        const subjectInput = screen.getByLabelText(/subject/i);
        await user.type(subjectInput, 'Project Inquiry');
        await user.tab();

        await waitFor(() => {
          expect(screen.queryByText(/subject/i)).not.toHaveTextContent('required');
        });
      });
    });

    describe('Message Field', () => {
      it('should show error when message is empty on blur', async () => {
        const user = userEvent.setup();
        render(<ContactForm />);

        const messageInput = screen.getByLabelText(/message/i);
        await user.click(messageInput);
        await user.tab();

        await waitFor(() => {
          expect(screen.getByText('Message is required')).toBeInTheDocument();
        });
      });

      it('should show error when message is too short', async () => {
        const user = userEvent.setup();
        render(<ContactForm />);

        const messageInput = screen.getByLabelText(/message/i);
        await user.type(messageInput, 'Hello');
        await user.tab();

        await waitFor(() => {
          expect(screen.getByText('Message must be at least 10 characters')).toBeInTheDocument();
        });
      });

      it('should show error when message exceeds maximum length', async () => {
        const user = userEvent.setup();
        render(<ContactForm />);

        const messageInput = screen.getByLabelText(/message/i) as HTMLTextAreaElement;
        const longMessage = 'a'.repeat(1001);
        
        // Use paste instead of type for long text
        await user.click(messageInput);
        await user.paste(longMessage);
        await user.tab();

        await waitFor(() => {
          expect(screen.getByText('Message must be less than 1000 characters')).toBeInTheDocument();
        });
      });

      it('should update character count as user types', async () => {
        const user = userEvent.setup();
        render(<ContactForm />);

        const messageInput = screen.getByLabelText(/message/i);
        await user.type(messageInput, 'Hello World');

        await waitFor(() => {
          expect(screen.getByText(/11/)).toBeInTheDocument();
          expect(screen.getByText(/1000/)).toBeInTheDocument();
        });
      });

      it('should accept valid message', async () => {
        const user = userEvent.setup();
        render(<ContactForm />);

        const messageInput = screen.getByLabelText(/message/i);
        await user.type(messageInput, 'This is a valid message with enough characters.');
        await user.tab();

        await waitFor(() => {
          expect(screen.queryByText(/message must be/i)).not.toBeInTheDocument();
        });
      });
    });
  });

  describe('Form Submission', () => {
    it('should not submit form with empty fields', async () => {
      const user = userEvent.setup();
      const onSubmit = vi.fn();
      render(<ContactForm onSubmit={onSubmit} />);

      const submitButton = screen.getByRole('button', { name: /send message/i });
      await user.click(submitButton);

      expect(onSubmit).not.toHaveBeenCalled();
      
      await waitFor(() => {
        expect(screen.getByText('Name is required')).toBeInTheDocument();
        expect(screen.getByText('Email is required')).toBeInTheDocument();
        expect(screen.getByText('Subject is required')).toBeInTheDocument();
        expect(screen.getByText('Message is required')).toBeInTheDocument();
      });
    });

    it('should submit form with valid data', async () => {
      const user = userEvent.setup();
      const onSubmit = vi.fn().mockResolvedValue(true);
      render(<ContactForm onSubmit={onSubmit} />);

      await user.type(screen.getByLabelText(/name/i), 'John Doe');
      await user.type(screen.getByLabelText(/email/i), 'john@example.com');
      await user.type(screen.getByLabelText(/subject/i), 'Project Inquiry');
      await user.type(screen.getByLabelText(/message/i), 'I would like to discuss a project with you.');

      const submitButton = screen.getByRole('button', { name: /send message/i });
      await user.click(submitButton);

      await waitFor(() => {
        expect(onSubmit).toHaveBeenCalled();
        const callArgs = onSubmit.mock.calls[0][0];
        expect(callArgs.name).toBe('John Doe');
        expect(callArgs.email).toBe('john@example.com');
        expect(callArgs.subject).toBe('Project Inquiry');
        expect(callArgs.message).toBe('I would like to discuss a project with you.');
      });
    });

    it('should show success message on successful submission', async () => {
      const user = userEvent.setup();
      const onSubmit = vi.fn().mockResolvedValue(true);
      render(<ContactForm onSubmit={onSubmit} />);

      await user.type(screen.getByLabelText(/name/i), 'John Doe');
      await user.type(screen.getByLabelText(/email/i), 'john@example.com');
      await user.type(screen.getByLabelText(/subject/i), 'Project Inquiry');
      await user.type(screen.getByLabelText(/message/i), 'I would like to discuss a project.');

      const submitButton = screen.getByRole('button', { name: /send message/i });
      await user.click(submitButton);

      await waitFor(() => {
        expect(screen.getByText(/thank you for your message/i)).toBeInTheDocument();
      });
    });

    it('should show error message on failed submission', async () => {
      const user = userEvent.setup();
      const onSubmit = vi.fn().mockResolvedValue(false);
      render(<ContactForm onSubmit={onSubmit} />);

      await user.type(screen.getByLabelText(/name/i), 'John Doe');
      await user.type(screen.getByLabelText(/email/i), 'john@example.com');
      await user.type(screen.getByLabelText(/subject/i), 'Project Inquiry');
      await user.type(screen.getByLabelText(/message/i), 'I would like to discuss a project.');

      const submitButton = screen.getByRole('button', { name: /send message/i });
      await user.click(submitButton);

      await waitFor(() => {
        expect(screen.getByText(/sorry, there was an error/i)).toBeInTheDocument();
      });
    });

    it('should handle submission errors gracefully', async () => {
      const user = userEvent.setup();
      const onSubmit = vi.fn().mockRejectedValue(new Error('Network error'));
      render(<ContactForm onSubmit={onSubmit} />);

      await user.type(screen.getByLabelText(/name/i), 'John Doe');
      await user.type(screen.getByLabelText(/email/i), 'john@example.com');
      await user.type(screen.getByLabelText(/subject/i), 'Project Inquiry');
      await user.type(screen.getByLabelText(/message/i), 'I would like to discuss a project.');

      const submitButton = screen.getByRole('button', { name: /send message/i });
      await user.click(submitButton);

      await waitFor(() => {
        expect(screen.getByText(/sorry, there was an error/i)).toBeInTheDocument();
      });
    });

    it('should disable form fields during submission', async () => {
      const user = userEvent.setup();
      let resolveSubmit: (value: boolean) => void;
      const submitPromise = new Promise<boolean>(resolve => {
        resolveSubmit = resolve;
      });
      const onSubmit = vi.fn().mockReturnValue(submitPromise);
      render(<ContactForm onSubmit={onSubmit} />);

      await user.type(screen.getByLabelText(/name/i), 'John Doe');
      await user.type(screen.getByLabelText(/email/i), 'john@example.com');
      await user.type(screen.getByLabelText(/subject/i), 'Project Inquiry');
      await user.type(screen.getByLabelText(/message/i), 'I would like to discuss a project.');

      const submitButton = screen.getByRole('button', { name: /send message/i });
      await user.click(submitButton);

      // Check fields are disabled during submission
      await waitFor(() => {
        expect(screen.getByLabelText(/name/i)).toBeDisabled();
        expect(screen.getByLabelText(/email/i)).toBeDisabled();
        expect(screen.getByLabelText(/subject/i)).toBeDisabled();
        expect(screen.getByLabelText(/message/i)).toBeDisabled();
        expect(submitButton).toBeDisabled();
      });

      // Resolve the promise
      resolveSubmit!(true);
    });

    it('should show loading state during submission', async () => {
      const user = userEvent.setup();
      const onSubmit = vi.fn().mockImplementation(() => new Promise(resolve => setTimeout(() => resolve(true), 100)));
      render(<ContactForm onSubmit={onSubmit} />);

      await user.type(screen.getByLabelText(/name/i), 'John Doe');
      await user.type(screen.getByLabelText(/email/i), 'john@example.com');
      await user.type(screen.getByLabelText(/subject/i), 'Project Inquiry');
      await user.type(screen.getByLabelText(/message/i), 'I would like to discuss a project.');

      const submitButton = screen.getByRole('button', { name: /send message/i });
      await user.click(submitButton);

      expect(screen.getByText('Sending...')).toBeInTheDocument();
    });

    it('should clear form after successful submission', async () => {
      const user = userEvent.setup();
      const onSubmit = vi.fn().mockResolvedValue(true);
      render(<ContactForm onSubmit={onSubmit} />);

      const nameInput = screen.getByLabelText(/name/i) as HTMLInputElement;
      const emailInput = screen.getByLabelText(/email/i) as HTMLInputElement;
      const subjectInput = screen.getByLabelText(/subject/i) as HTMLInputElement;
      const messageInput = screen.getByLabelText(/message/i) as HTMLTextAreaElement;

      await user.type(nameInput, 'John Doe');
      await user.type(emailInput, 'john@example.com');
      await user.type(subjectInput, 'Project Inquiry');
      await user.type(messageInput, 'I would like to discuss a project.');

      const submitButton = screen.getByRole('button', { name: /send message/i });
      await user.click(submitButton);

      await waitFor(() => {
        expect(nameInput.value).toBe('');
        expect(emailInput.value).toBe('');
        expect(subjectInput.value).toBe('');
        expect(messageInput.value).toBe('');
      });
    });
  });

  describe('Accessibility', () => {
    it('should have proper ARIA labels for form fields', () => {
      render(<ContactForm />);

      expect(screen.getByLabelText(/name/i)).toHaveAttribute('id', 'contact-name');
      expect(screen.getByLabelText(/email/i)).toHaveAttribute('id', 'contact-email');
      expect(screen.getByLabelText(/subject/i)).toHaveAttribute('id', 'contact-subject');
      expect(screen.getByLabelText(/message/i)).toHaveAttribute('id', 'contact-message');
    });

    it('should set aria-invalid when field has error', async () => {
      const user = userEvent.setup();
      render(<ContactForm />);

      const nameInput = screen.getByLabelText(/name/i);
      await user.click(nameInput);
      await user.tab();

      await waitFor(() => {
        expect(nameInput).toHaveAttribute('aria-invalid', 'true');
      });
    });

    it('should associate error messages with fields using aria-describedby', async () => {
      const user = userEvent.setup();
      render(<ContactForm />);

      const nameInput = screen.getByLabelText(/name/i);
      await user.click(nameInput);
      await user.tab();

      await waitFor(() => {
        expect(nameInput).toHaveAttribute('aria-describedby', 'name-error');
        expect(screen.getByText('Name is required')).toHaveAttribute('id', 'name-error');
      });
    });

    it('should have role="alert" for error messages', async () => {
      const user = userEvent.setup();
      render(<ContactForm />);

      const nameInput = screen.getByLabelText(/name/i);
      await user.click(nameInput);
      await user.tab();

      await waitFor(() => {
        const errorMessage = screen.getByText('Name is required');
        expect(errorMessage).toHaveAttribute('role', 'alert');
      });
    });

    it('should have aria-live region for submit status', async () => {
      const user = userEvent.setup();
      const onSubmit = vi.fn().mockResolvedValue(true);
      render(<ContactForm onSubmit={onSubmit} />);

      await user.type(screen.getByLabelText(/name/i), 'John Doe');
      await user.type(screen.getByLabelText(/email/i), 'john@example.com');
      await user.type(screen.getByLabelText(/subject/i), 'Project Inquiry');
      await user.type(screen.getByLabelText(/message/i), 'I would like to discuss a project.');

      const submitButton = screen.getByRole('button', { name: /send message/i });
      await user.click(submitButton);

      await waitFor(() => {
        const statusMessage = screen.getByRole('status');
        expect(statusMessage).toHaveAttribute('aria-live', 'polite');
      });
    });
  });

  describe('Edge Cases', () => {
    it('should handle rapid form submissions', async () => {
      const user = userEvent.setup();
      const onSubmit = vi.fn().mockResolvedValue(true);
      render(<ContactForm onSubmit={onSubmit} />);

      await user.type(screen.getByLabelText(/name/i), 'John Doe');
      await user.type(screen.getByLabelText(/email/i), 'john@example.com');
      await user.type(screen.getByLabelText(/subject/i), 'Project Inquiry');
      await user.type(screen.getByLabelText(/message/i), 'I would like to discuss a project.');

      const submitButton = screen.getByRole('button', { name: /send message/i });
      
      // Try to submit multiple times
      await user.click(submitButton);
      await user.click(submitButton);
      await user.click(submitButton);

      // Should only submit once due to disabled state
      await waitFor(() => {
        expect(onSubmit).toHaveBeenCalledTimes(1);
      });
    });

    it('should trim whitespace from inputs during validation', async () => {
      const user = userEvent.setup();
      render(<ContactForm />);

      const nameInput = screen.getByLabelText(/name/i);
      await user.type(nameInput, '   ');
      await user.tab();

      await waitFor(() => {
        expect(screen.getByText('Name is required')).toBeInTheDocument();
      });
    });

    it('should handle default submission without custom onSubmit', async () => {
      const user = userEvent.setup();
      render(<ContactForm />);

      await user.type(screen.getByLabelText(/name/i), 'John Doe');
      await user.type(screen.getByLabelText(/email/i), 'john@example.com');
      await user.type(screen.getByLabelText(/subject/i), 'Project Inquiry');
      await user.type(screen.getByLabelText(/message/i), 'I would like to discuss a project.');

      const submitButton = screen.getByRole('button', { name: /send message/i });
      await user.click(submitButton);

      await waitFor(() => {
        expect(screen.getByText(/thank you for your message/i)).toBeInTheDocument();
      }, { timeout: 3000 });
    });
  });
});
