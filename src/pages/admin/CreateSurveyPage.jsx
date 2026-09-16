import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  ArrowLeft,
  Save,
  X,
  Plus,
  Trash2,
  Calendar,
  Layers,
  HelpCircle,
  Users,
  CheckCircle2,
  AlertCircle,
} from 'lucide-react';
import { AdminLayout } from './AdminLayout';
import { useToast } from '../../context/ToastContext';

export const CreateSurveyPage = () => {
  const navigate = useNavigate();
  const { showToast } = useToast();

  // Main Form State matching screenshot
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    start_date: '',
    end_date: '',
    status: '',
    roles: [],
    target_audience: '',
    questions: [
      {
        question: '',
        type: '',
        is_required: false,
        options: ['', ''],
      },
    ],
  });

  const [submitting, setSubmitting] = useState(false);

  // Role checkbox toggler
  const handleRoleChange = (role) => {
    setFormData((prev) => {
      const exists = prev.roles.includes(role);
      return {
        ...prev,
        roles: exists ? prev.roles.filter((r) => r !== role) : [...prev.roles, role],
      };
    });
  };

  // Question handlers
  const handleAddQuestion = () => {
    setFormData((prev) => ({
      ...prev,
      questions: [
        ...prev.questions,
        {
          question: '',
          type: '',
          is_required: false,
          options: ['', ''],
        },
      ],
    }));
  };

  const handleRemoveQuestion = (index) => {
    if (formData.questions.length <= 1) {
      showToast('A survey must contain at least one question', 'error');
      return;
    }
    setFormData((prev) => ({
      ...prev,
      questions: prev.questions.filter((_, i) => i !== index),
    }));
  };

  const handleQuestionChange = (index, field, value) => {
    setFormData((prev) => {
      const updatedQuestions = [...prev.questions];
      updatedQuestions[index] = {
        ...updatedQuestions[index],
        [field]: value,
      };
      // If type changed to text, rating, etc.
      if (field === 'type' && (value === 'radio' || value === 'checkbox') && updatedQuestions[index].options.length === 0) {
        updatedQuestions[index].options = ['', ''];
      }
      return { ...prev, questions: updatedQuestions };
    });
  };

  // Option handlers
  const handleAddOption = (questionIndex) => {
    setFormData((prev) => {
      const updatedQuestions = [...prev.questions];
      if (updatedQuestions[questionIndex].options.length >= 5) {
        showToast('Maximum 5 options allowed per question', 'info');
        return prev;
      }
      updatedQuestions[questionIndex].options.push('');
      return { ...prev, questions: updatedQuestions };
    });
  };

  const handleRemoveOption = (questionIndex, optionIndex) => {
    setFormData((prev) => {
      const updatedQuestions = [...prev.questions];
      if (updatedQuestions[questionIndex].options.length <= 2) {
        showToast('Minimum 2 options are required for choice questions', 'error');
        return prev;
      }
      updatedQuestions[questionIndex].options = updatedQuestions[questionIndex].options.filter(
        (_, i) => i !== optionIndex
      );
      return { ...prev, questions: updatedQuestions };
    });
  };

  const handleOptionTextChange = (questionIndex, optionIndex, value) => {
    setFormData((prev) => {
      const updatedQuestions = [...prev.questions];
      updatedQuestions[questionIndex].options[optionIndex] = value;
      return { ...prev, questions: updatedQuestions };
    });
  };

  // Form Submission
  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.title.trim()) {
      showToast('Please enter a survey title', 'error');
      return;
    }
    if (!formData.start_date) {
      showToast('Please select a start date', 'error');
      return;
    }
    if (!formData.end_date) {
      showToast('Please select an end date', 'error');
      return;
    }
    if (!formData.status) {
      showToast('Please select a survey status', 'error');
      return;
    }

    // Validate questions
    for (let i = 0; i < formData.questions.length; i++) {
      const q = formData.questions[i];
      if (!q.question.trim()) {
        showToast(`Please enter question text for Question #${i + 1}`, 'error');
        return;
      }
      if (!q.type) {
        showToast(`Please select a question type for Question #${i + 1}`, 'error');
        return;
      }
      if (q.type === 'radio' || q.type === 'checkbox') {
        const validOptions = q.options.filter((opt) => opt.trim().length > 0);
        if (validOptions.length < 2) {
          showToast(`Question #${i + 1} must have at least 2 non-empty options`, 'error');
          return;
        }
      }
    }

    setSubmitting(true);
    setTimeout(() => {
      setSubmitting(false);
      showToast('Survey created and published successfully!', 'success');
      navigate('/admin/poll-survey');
    }, 600);
  };

  return (
    <AdminLayout>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', fontFamily: 'inherit' }}>
        
        {/* ========================================================================= */}
        {/* Page Header & Back Button                                                 */}
        {/* ========================================================================= */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: '12px',
          }}
        >
          <div>
            <h1
              style={{
                fontSize: '1.5rem',
                fontWeight: 700,
                color: '#111827',
                margin: 0,
                letterSpacing: '-0.02em',
              }}
            >
              Create New Survey
            </h1>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                fontSize: '0.85rem',
                color: '#6B7280',
                marginTop: '4px',
              }}
            >
              <a
                href="/admin/dashboard"
                style={{ color: '#6B7280', textDecoration: 'none', fontWeight: 500 }}
              >
                Dashboard
              </a>
              <span>/</span>
              <a
                href="/admin/poll-survey"
                style={{ color: '#6B7280', textDecoration: 'none', fontWeight: 500 }}
              >
                Surveys
              </a>
              <span>/</span>
              <span style={{ color: '#111827', fontWeight: 600 }}>Create</span>
            </div>
          </div>

          <button
            onClick={() => navigate('/admin/poll-survey')}
            style={{
              backgroundColor: '#475569',
              color: '#FFFFFF',
              border: 'none',
              borderRadius: '8px',
              padding: '10px 18px',
              fontSize: '0.875rem',
              fontWeight: 600,
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              cursor: 'pointer',
              boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
              transition: 'background-color 0.15s ease',
            }}
            onMouseOver={(e) => (e.currentTarget.style.backgroundColor = '#334155')}
            onMouseOut={(e) => (e.currentTarget.style.backgroundColor = '#475569')}
          >
            <ArrowLeft size={16} />
            Back to Surveys
          </button>
        </div>

        {/* ========================================================================= */}
        {/* Main Survey Creation Form Card                                            */}
        {/* ========================================================================= */}
        <div
          style={{
            backgroundColor: '#FFFFFF',
            borderRadius: '12px',
            border: '1px solid #E5E7EB',
            boxShadow: '0 1px 3px rgba(0,0,0,0.04)',
            padding: '28px 32px',
          }}
        >
          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '22px' }}>
            
            {/* Row 1: Survey Title & Start Date */}
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
                gap: '24px',
              }}
            >
              {/* Survey Title */}
              <div>
                <label
                  style={{
                    display: 'block',
                    fontSize: '0.875rem',
                    fontWeight: 600,
                    color: '#374151',
                    marginBottom: '8px',
                  }}
                >
                  Survey Title <span style={{ color: '#EF4444' }}>*</span>
                </label>
                <input
                  type="text"
                  required
                  placeholder="Enter survey title"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  style={{
                    width: '100%',
                    height: '42px',
                    borderRadius: '8px',
                    border: '1px solid #CBD5E1',
                    padding: '0 14px',
                    fontSize: '0.9rem',
                    outline: 'none',
                    boxSizing: 'border-box',
                    backgroundColor: '#FFFFFF',
                    color: '#111827',
                  }}
                />
              </div>

              {/* Start Date */}
              <div>
                <label
                  style={{
                    display: 'block',
                    fontSize: '0.875rem',
                    fontWeight: 600,
                    color: '#374151',
                    marginBottom: '8px',
                  }}
                >
                  Start Date <span style={{ color: '#EF4444' }}>*</span>
                </label>
                <input
                  type="datetime-local"
                  required
                  value={formData.start_date}
                  onChange={(e) => setFormData({ ...formData, start_date: e.target.value })}
                  style={{
                    width: '100%',
                    height: '42px',
                    borderRadius: '8px',
                    border: '1px solid #CBD5E1',
                    padding: '0 14px',
                    fontSize: '0.9rem',
                    outline: 'none',
                    boxSizing: 'border-box',
                    backgroundColor: '#FFFFFF',
                    color: '#111827',
                  }}
                />
              </div>
            </div>

            {/* Row 2: Description & (End Date + Status) */}
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
                gap: '24px',
              }}
            >
              {/* Description */}
              <div>
                <label
                  style={{
                    display: 'block',
                    fontSize: '0.875rem',
                    fontWeight: 600,
                    color: '#374151',
                    marginBottom: '8px',
                  }}
                >
                  Description
                </label>
                <textarea
                  rows={4}
                  placeholder="Enter survey description (optional)"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  style={{
                    width: '100%',
                    borderRadius: '8px',
                    border: '1px solid #CBD5E1',
                    padding: '12px 14px',
                    fontSize: '0.875rem',
                    outline: 'none',
                    boxSizing: 'border-box',
                    fontFamily: 'inherit',
                    backgroundColor: '#FFFFFF',
                    color: '#111827',
                    resize: 'vertical',
                  }}
                />
              </div>

              {/* Right Column: End Date & Status */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                {/* End Date */}
                <div>
                  <label
                    style={{
                      display: 'block',
                      fontSize: '0.875rem',
                      fontWeight: 600,
                      color: '#374151',
                      marginBottom: '8px',
                    }}
                  >
                    End Date <span style={{ color: '#EF4444' }}>*</span>
                  </label>
                  <input
                    type="datetime-local"
                    required
                    value={formData.end_date}
                    onChange={(e) => setFormData({ ...formData, end_date: e.target.value })}
                    style={{
                      width: '100%',
                      height: '42px',
                      borderRadius: '8px',
                      border: '1px solid #CBD5E1',
                      padding: '0 14px',
                      fontSize: '0.9rem',
                      outline: 'none',
                      boxSizing: 'border-box',
                      backgroundColor: '#FFFFFF',
                      color: '#111827',
                    }}
                  />
                </div>

                {/* Status */}
                <div>
                  <label
                    style={{
                      display: 'block',
                      fontSize: '0.875rem',
                      fontWeight: 600,
                      color: '#374151',
                      marginBottom: '8px',
                    }}
                  >
                    Status <span style={{ color: '#EF4444' }}>*</span>
                  </label>
                  <select
                    required
                    value={formData.status}
                    onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                    style={{
                      width: '100%',
                      height: '42px',
                      borderRadius: '8px',
                      border: '1px solid #CBD5E1',
                      padding: '0 12px',
                      fontSize: '0.875rem',
                      outline: 'none',
                      boxSizing: 'border-box',
                      backgroundColor: '#FFFFFF',
                      color: !formData.status ? '#9CA3AF' : '#111827',
                      cursor: 'pointer',
                    }}
                  >
                    <option value="">-- Select Status --</option>
                    <option value="draft">Draft</option>
                    <option value="active">Active</option>
                    <option value="inactive">Inactive</option>
                    <option value="expired">Expired</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Row 3: Roles Checkboxes */}
            <div style={{ maxWidth: '680px' }}>
              <label
                style={{
                  display: 'block',
                  fontSize: '0.875rem',
                  fontWeight: 600,
                  color: '#374151',
                  marginBottom: '10px',
                }}
              >
                Roles (Optional)
              </label>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                {[
                  { id: 'driver', label: 'Driver' },
                  { id: 'transporter', label: 'Transporter' },
                  { id: 'foreman', label: 'Foreman' },
                  { id: 'association', label: 'Association' },
                ].map((role) => {
                  const isChecked = formData.roles.includes(role.id);
                  return (
                    <label
                      key={role.id}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '10px',
                        cursor: 'pointer',
                        fontSize: '0.875rem',
                        color: '#374151',
                      }}
                    >
                      <input
                        type="checkbox"
                        checked={isChecked}
                        onChange={() => handleRoleChange(role.id)}
                        style={{
                          width: '16px',
                          height: '16px',
                          accentColor: '#2563EB',
                          cursor: 'pointer',
                        }}
                      />
                      <span>{role.label}</span>
                    </label>
                  );
                })}
              </div>
            </div>

            {/* Row 4: Audience Type */}
            <div style={{ maxWidth: '680px' }}>
              <label
                style={{
                  display: 'block',
                  fontSize: '0.875rem',
                  fontWeight: 600,
                  color: '#374151',
                  marginBottom: '8px',
                }}
              >
                Audience Type
              </label>
              <select
                value={formData.target_audience}
                onChange={(e) => setFormData({ ...formData, target_audience: e.target.value })}
                style={{
                  width: '100%',
                  height: '42px',
                  borderRadius: '8px',
                  border: '1px solid #CBD5E1',
                  padding: '0 12px',
                  fontSize: '0.875rem',
                  outline: 'none',
                  boxSizing: 'border-box',
                  backgroundColor: '#FFFFFF',
                  color: '#111827',
                  cursor: 'pointer',
                }}
              >
                <option value="">Role based audience</option>
                <option value="transporters_with_jobs">All transporters who posted jobs</option>
              </select>
              <p style={{ fontSize: '0.75rem', color: '#6B7280', margin: '6px 0 0', lineHeight: 1.4 }}>
                Use this for one survey to every transporter who has at least one posted job. The latest job ID can be added in the question using XXXX or &#123;&#123; job_id &#125;&#125;.
              </p>
            </div>

            {/* Horizontal Line Divider */}
            <hr style={{ border: 'none', borderTop: '1px solid #E5E7EB', margin: '10px 0' }} />

            {/* ========================================================================= */}
            {/* Survey Questions Section                                                  */}
            {/* ========================================================================= */}
            <div>
              <h3
                style={{
                  fontSize: '1.15rem',
                  fontWeight: 700,
                  color: '#111827',
                  marginBottom: '16px',
                }}
              >
                Survey Questions
              </h3>

              {/* Questions Container */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                {formData.questions.map((q, qIndex) => (
                  <div
                    key={qIndex}
                    style={{
                      backgroundColor: '#F8FAFC',
                      border: '1px solid #E2E8F0',
                      borderRadius: '10px',
                      padding: '20px',
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '16px',
                    }}
                  >
                    {/* Question text */}
                    <div>
                      <label
                        style={{
                          display: 'block',
                          fontSize: '0.85rem',
                          fontWeight: 600,
                          color: '#374151',
                          marginBottom: '6px',
                        }}
                      >
                        Question <span style={{ color: '#EF4444' }}>*</span>
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="Enter question"
                        value={q.question}
                        onChange={(e) => handleQuestionChange(qIndex, 'question', e.target.value)}
                        style={{
                          width: '100%',
                          height: '40px',
                          borderRadius: '8px',
                          border: '1px solid #CBD5E1',
                          padding: '0 12px',
                          fontSize: '0.875rem',
                          outline: 'none',
                          boxSizing: 'border-box',
                          backgroundColor: '#FFFFFF',
                          color: '#111827',
                        }}
                      />
                    </div>

                    {/* Question Type */}
                    <div>
                      <label
                        style={{
                          display: 'block',
                          fontSize: '0.85rem',
                          fontWeight: 600,
                          color: '#374151',
                          marginBottom: '6px',
                        }}
                      >
                        Question Type <span style={{ color: '#EF4444' }}>*</span>
                      </label>
                      <select
                        required
                        value={q.type}
                        onChange={(e) => handleQuestionChange(qIndex, 'type', e.target.value)}
                        style={{
                          width: '100%',
                          height: '40px',
                          borderRadius: '8px',
                          border: '1px solid #CBD5E1',
                          padding: '0 12px',
                          fontSize: '0.875rem',
                          outline: 'none',
                          boxSizing: 'border-box',
                          backgroundColor: '#FFFFFF',
                          color: !q.type ? '#9CA3AF' : '#111827',
                          cursor: 'pointer',
                        }}
                      >
                        <option value="">-- Select Type --</option>
                        <option value="text">Text Answer</option>
                        <option value="radio">Radio (Single Choice)</option>
                        <option value="checkbox">Checkbox (Multiple Choice)</option>
                        <option value="rating">Rating (1-5 Stars)</option>
                      </select>
                    </div>

                    {/* Required Checkbox */}
                    <label
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '8px',
                        cursor: 'pointer',
                        fontSize: '0.85rem',
                        color: '#374151',
                        fontWeight: 500,
                      }}
                    >
                      <input
                        type="checkbox"
                        checked={q.is_required}
                        onChange={(e) => handleQuestionChange(qIndex, 'is_required', e.target.checked)}
                        style={{
                          width: '16px',
                          height: '16px',
                          accentColor: '#2563EB',
                          cursor: 'pointer',
                        }}
                      />
                      <span>Required</span>
                    </label>

                    {/* Dynamic Options for Radio & Checkbox */}
                    {(q.type === 'radio' || q.type === 'checkbox') && (
                      <div
                        style={{
                          backgroundColor: '#FFFFFF',
                          border: '1px solid #E2E8F0',
                          borderRadius: '8px',
                          padding: '16px',
                          marginTop: '4px',
                        }}
                      >
                        <label
                          style={{
                            display: 'block',
                            fontSize: '0.85rem',
                            fontWeight: 600,
                            color: '#374151',
                            marginBottom: '10px',
                          }}
                        >
                          Options <span style={{ color: '#EF4444' }}>*</span>
                        </label>

                        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                          {q.options.map((opt, optIndex) => (
                            <div key={optIndex} style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                              <input
                                type="text"
                                required
                                placeholder={`Option ${optIndex + 1}`}
                                value={opt}
                                onChange={(e) => handleOptionTextChange(qIndex, optIndex, e.target.value)}
                                style={{
                                  flex: 1,
                                  height: '38px',
                                  borderRadius: '6px',
                                  border: '1px solid #CBD5E1',
                                  padding: '0 12px',
                                  fontSize: '0.85rem',
                                  outline: 'none',
                                  boxSizing: 'border-box',
                                  backgroundColor: '#FFFFFF',
                                }}
                              />
                              {q.options.length > 2 && (
                                <button
                                  type="button"
                                  onClick={() => handleRemoveOption(qIndex, optIndex)}
                                  style={{
                                    height: '38px',
                                    padding: '0 12px',
                                    backgroundColor: '#FFFFFF',
                                    border: '1px solid #EF4444',
                                    color: '#EF4444',
                                    borderRadius: '6px',
                                    fontSize: '0.8rem',
                                    fontWeight: 600,
                                    cursor: 'pointer',
                                    transition: 'all 0.15s',
                                  }}
                                  onMouseOver={(e) => {
                                    e.currentTarget.style.backgroundColor = '#EF4444';
                                    e.currentTarget.style.color = '#FFFFFF';
                                  }}
                                  onMouseOut={(e) => {
                                    e.currentTarget.style.backgroundColor = '#FFFFFF';
                                    e.currentTarget.style.color = '#EF4444';
                                  }}
                                >
                                  Remove
                                </button>
                              )}
                            </div>
                          ))}

                          {q.options.length < 5 && (
                            <button
                              type="button"
                              onClick={() => handleAddOption(qIndex)}
                              style={{
                                alignSelf: 'flex-start',
                                backgroundColor: '#64748B',
                                color: '#FFFFFF',
                                border: 'none',
                                borderRadius: '6px',
                                padding: '6px 12px',
                                fontSize: '0.8rem',
                                fontWeight: 600,
                                cursor: 'pointer',
                                display: 'flex',
                                alignItems: 'center',
                                gap: '4px',
                                marginTop: '4px',
                              }}
                            >
                              <Plus size={14} /> Add Option
                            </button>
                          )}
                        </div>
                      </div>
                    )}

                    {/* Remove Question Button */}
                    <div style={{ marginTop: '4px' }}>
                      <button
                        type="button"
                        onClick={() => handleRemoveQuestion(qIndex)}
                        style={{
                          backgroundColor: '#FFFFFF',
                          border: '1px solid #EF4444',
                          color: '#EF4444',
                          borderRadius: '6px',
                          padding: '7px 12px',
                          fontSize: '0.8rem',
                          fontWeight: 600,
                          cursor: 'pointer',
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: '6px',
                          transition: 'all 0.15s',
                        }}
                        onMouseOver={(e) => {
                          e.currentTarget.style.backgroundColor = '#EF4444';
                          e.currentTarget.style.color = '#FFFFFF';
                        }}
                        onMouseOut={(e) => {
                          e.currentTarget.style.backgroundColor = '#FFFFFF';
                          e.currentTarget.style.color = '#EF4444';
                        }}
                      >
                        <Trash2 size={13} /> Remove Question
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              {/* Add Question Button */}
              <div style={{ marginTop: '16px' }}>
                <button
                  type="button"
                  onClick={handleAddQuestion}
                  style={{
                    backgroundColor: '#475569',
                    color: '#FFFFFF',
                    border: 'none',
                    borderRadius: '8px',
                    padding: '10px 18px',
                    fontSize: '0.85rem',
                    fontWeight: 600,
                    cursor: 'pointer',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '6px',
                    transition: 'background-color 0.15s',
                  }}
                  onMouseOver={(e) => (e.currentTarget.style.backgroundColor = '#334155')}
                  onMouseOut={(e) => (e.currentTarget.style.backgroundColor = '#475569')}
                >
                  <Plus size={16} /> Add Question
                </button>
              </div>
            </div>

            {/* Horizontal Line Divider */}
            <hr style={{ border: 'none', borderTop: '1px solid #E5E7EB', margin: '10px 0' }} />

            {/* Form Footer Action Buttons */}
            <div style={{ display: 'flex', gap: '10px' }}>
              <button
                type="submit"
                disabled={submitting}
                style={{
                  backgroundColor: '#2563EB',
                  color: '#FFFFFF',
                  border: 'none',
                  borderRadius: '8px',
                  padding: '10px 22px',
                  fontSize: '0.9rem',
                  fontWeight: 600,
                  cursor: submitting ? 'not-allowed' : 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  boxShadow: '0 2px 4px rgba(37, 99, 235, 0.2)',
                  transition: 'background-color 0.15s',
                }}
                onMouseOver={(e) => {
                  if (!submitting) e.currentTarget.style.backgroundColor = '#1D4ED8';
                }}
                onMouseOut={(e) => {
                  if (!submitting) e.currentTarget.style.backgroundColor = '#2563EB';
                }}
              >
                <Save size={16} />
                {submitting ? 'Creating Survey...' : 'Create Survey'}
              </button>

              <button
                type="button"
                onClick={() => navigate('/admin/poll-survey')}
                style={{
                  backgroundColor: '#475569',
                  color: '#FFFFFF',
                  border: 'none',
                  borderRadius: '8px',
                  padding: '10px 18px',
                  fontSize: '0.9rem',
                  fontWeight: 600,
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                }}
                onMouseOver={(e) => (e.currentTarget.style.backgroundColor = '#334155')}
                onMouseOut={(e) => (e.currentTarget.style.backgroundColor = '#475569')}
              >
                <X size={16} /> Cancel
              </button>
            </div>

          </form>
        </div>

      </div>
    </AdminLayout>
  );
};
