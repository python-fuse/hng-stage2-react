import { useState } from 'react';
import { Button } from '../ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Textarea } from '../ui/textarea';
import { useTickets } from '../../context/TicketContext';
import { toast } from 'sonner';
import type { Ticket } from '../../types';

interface EditTicketFormProps {
  ticket: Ticket;
  onClose: () => void;
}

export default function EditTicketForm({ ticket, onClose }: EditTicketFormProps) {
  const [title, setTitle] = useState(ticket.title);
  const [description, setDescription] = useState(ticket.description || '');
  const [status, setStatus] = useState<'open' | 'in_progress' | 'closed'>(ticket.status);
  const [priority, setPriority] = useState<'low' | 'medium' | 'high'>(ticket.priority || 'medium');
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<{title?: string; description?: string}>({});

  const { updateTicket } = useTickets();

  const validateForm = () => {
    const newErrors: {title?: string; description?: string} = {};
    
    if (!title.trim()) {
      newErrors.title = 'Title is required';
    } else if (title.trim().length < 3) {
      newErrors.title = 'Title must be at least 3 characters';
    } else if (title.trim().length > 100) {
      newErrors.title = 'Title must be less than 100 characters';
    }
    
    if (description && description.length > 500) {
      newErrors.description = 'Description must be less than 500 characters';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      toast.error('Please fix the errors below');
      return;
    }
    
    setIsLoading(true);
    
    try {
      updateTicket(ticket.id, {
        title: title.trim(),
        description: description.trim() || undefined,
        status,
        priority
      });
      
      toast.success('Ticket updated successfully!');
      onClose();
    } catch (error) {
      toast.error('Failed to update ticket. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <Card className="w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle className="text-2xl">Edit Ticket</CardTitle>
            <Button variant="ghost" onClick={onClose} size="sm">
              ✕
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <Label htmlFor="title">Title *</Label>
              <Input
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className={`mt-1 ${errors.title ? 'border-red-500' : ''}`}
                placeholder="Enter ticket title"
                maxLength={100}
              />
              {errors.title && (
                <p className="text-red-600 text-sm mt-1">{errors.title}</p>
              )}
              <p className="text-gray-500 text-xs mt-1">{title.length}/100 characters</p>
            </div>

            <div>
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className={`mt-1 ${errors.description ? 'border-red-500' : ''}`}
                placeholder="Describe the issue or task (optional)"
                rows={4}
                maxLength={500}
              />
              {errors.description && (
                <p className="text-red-600 text-sm mt-1">{errors.description}</p>
              )}
              <p className="text-gray-500 text-xs mt-1">{description.length}/500 characters</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="status">Status *</Label>
                <select
                  id="status"
                  value={status}
                  onChange={(e) => setStatus(e.target.value as 'open' | 'in_progress' | 'closed')}
                  className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="open">Open</option>
                  <option value="in_progress">In Progress</option>
                  <option value="closed">Closed</option>
                </select>
              </div>

              <div>
                <Label htmlFor="priority">Priority</Label>
                <select
                  id="priority"
                  value={priority}
                  onChange={(e) => setPriority(e.target.value as 'low' | 'medium' | 'high')}
                  className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="low">Low</option>
                  <option value="medium">Medium</option>
                  <option value="high">High</option>
                </select>
              </div>
            </div>

            <div className="bg-gray-50 p-3 rounded-md text-sm text-gray-600">
              <p><strong>Created:</strong> {new Date(ticket.createdAt).toLocaleString()}</p>
              <p><strong>Last Updated:</strong> {new Date(ticket.updatedAt).toLocaleString()}</p>
            </div>

            <div className="flex justify-end gap-3 pt-4">
              <Button type="button" variant="outline" onClick={onClose}>
                Cancel
              </Button>
              <Button type="submit" disabled={isLoading}>
                {isLoading ? 'Updating...' : 'Update Ticket'}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}