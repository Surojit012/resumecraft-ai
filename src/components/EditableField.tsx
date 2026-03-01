import React, { useState, useEffect, useRef } from 'react';
import { cn } from '@/lib/utils';
import { Pencil } from 'lucide-react';

interface EditableFieldProps {
    value: string;
    onUpdate: (value: string) => void;
    className?: string;
    multiline?: boolean;
    placeholder?: string;
    as?: any;
}

export function EditableField({
    value,
    onUpdate,
    className,
    multiline = false,
    placeholder = 'Add text...',
    as: Component = 'div'
}: EditableFieldProps) {
    const [isEditing, setIsEditing] = useState(false);
    const [currentValue, setCurrentValue] = useState(value);
    const inputRef = useRef<HTMLInputElement | HTMLTextAreaElement>(null);

    useEffect(() => {
        setCurrentValue(value);
    }, [value]);

    useEffect(() => {
        if (isEditing && inputRef.current) {
            inputRef.current.focus();
            if (multiline && inputRef.current instanceof HTMLTextAreaElement) {
                inputRef.current.style.height = 'auto';
                inputRef.current.style.height = inputRef.current.scrollHeight + 'px';
            }
        }
    }, [isEditing, multiline]);

    const handleSave = () => {
        setIsEditing(false);
        if (currentValue !== value) {
            onUpdate(currentValue);
        }
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter' && (!multiline || e.ctrlKey || e.metaKey)) {
            e.preventDefault();
            handleSave();
        }
        if (e.key === 'Escape') {
            setIsEditing(false);
            setCurrentValue(value);
        }
    };

    if (isEditing) {
        return multiline ? (
            <textarea
                ref={inputRef as React.RefObject<HTMLTextAreaElement>}
                value={currentValue}
                onChange={(e) => {
                    setCurrentValue(e.target.value);
                    e.target.style.height = 'auto';
                    e.target.style.height = e.target.scrollHeight + 'px';
                }}
                onBlur={handleSave}
                onKeyDown={handleKeyDown}
                className={cn(
                    "w-full bg-slate-50 border border-indigo-300 rounded focus:outline-none focus:ring-2 focus:ring-indigo-500/20 p-1 font-inherit resize-none overflow-hidden",
                    className
                )}
                style={{ minHeight: '2em' }}
                placeholder={placeholder}
            />
        ) : (
            <input
                ref={inputRef as React.RefObject<HTMLInputElement>}
                type="text"
                value={currentValue}
                onChange={(e) => setCurrentValue(e.target.value)}
                onBlur={handleSave}
                onKeyDown={handleKeyDown}
                className={cn(
                    "w-full bg-slate-50 border border-indigo-300 rounded focus:outline-none focus:ring-2 focus:ring-indigo-500/20 p-1 font-inherit",
                    className
                )}
                placeholder={placeholder}
            />
        );
    }

    return (
        <Component
            onClick={() => setIsEditing(true)}
            className={cn(
                "group relative cursor-text hover:bg-slate-50/50 hover:ring-1 hover:ring-slate-200/50 rounded transition-all -ml-1 p-1 whitespace-pre-line",
                !value && "text-slate-400 italic",
                className
            )}
        >
            {value || placeholder}
            <div className="absolute top-1 right-1 opacity-0 group-hover:opacity-100 transition-opacity bg-white/80 p-0.5 rounded text-slate-400">
                <Pencil size={12} />
            </div>
        </Component>
    );
}
