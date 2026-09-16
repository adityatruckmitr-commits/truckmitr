import React, { useState } from 'react';
import { Video, Award, CheckCircle, Play, FileText, Download, CheckCircle2 } from 'lucide-react';
import { PortalLayout } from '../../components/layout/PortalLayout';
import { Card } from '../../components/common/Card';
import { Badge } from '../../components/common/Badge';
import { Button } from '../../components/common/Button';
import { Modal } from '../../components/common/Modal';
import { useToast } from '../../context/ToastContext';

export const DriverWelfarePage = () => {
  const { showToast } = useToast();
  const [activeCourse, setActiveCourse] = useState(null);
  const [quizModalOpen, setQuizModalOpen] = useState(false);
  const [quizAnswers, setQuizAnswers] = useState({});
  const [quizResult, setQuizResult] = useState(null);

  const courses = [
    {
      id: 1,
      title: 'Commercial Highway Safe Driving & Fog Protocol',
      duration: '18 Mins',
      lessons: '3 Lessons',
      completed: true,
      description: 'Master visibility guidelines in heavy fog, tailgating prevention, and expressway overtaking rules.',
    },
    {
      id: 2,
      title: 'Advanced Fuel Efficiency & Gear Shifting (Eco-Drive)',
      duration: '24 Mins',
      lessons: '4 Lessons',
      completed: true,
      description: 'Learn driving techniques that save up to 15% diesel consumption on long-haul container runs.',
    },
    {
      id: 3,
      title: 'Accident Emergency & Highway First-Aid Protocol',
      duration: '15 Mins',
      lessons: '2 Lessons',
      completed: false,
      description: 'Golden hour emergency response, hazard warning deployment, and 108 trauma support guidelines.',
    },
  ];

  const quizQuestions = [
    {
      id: 'q1',
      question: 'What is the recommended minimum following distance behind another heavy commercial vehicle on highways in foggy conditions?',
      options: ['10 Meters', '50 Meters or 4-Second Rule', '5 Meters', '20 Meters'],
      correct: 1,
    },
    {
      id: 'q2',
      question: 'How much diesel fuel can correct tyre pressure and progressive gear shifting typically save on multi-axle trailers?',
      options: ['Up to 2%', '10% to 15%', 'Over 50%', 'No fuel is saved'],
      correct: 1,
    },
  ];

  const handleQuizSubmit = () => {
    if (Object.keys(quizAnswers).length < quizQuestions.length) {
      showToast('Please answer all questions before submitting', 'warning');
      return;
    }
    let score = 0;
    quizQuestions.forEach((q, idx) => {
      if (quizAnswers[q.id] === q.correct) score += 1;
    });

    const passed = score === quizQuestions.length;
    setQuizResult({ score, total: quizQuestions.length, passed });
    if (passed) {
      showToast('Congratulations! You scored 100% and earned the Safe Driver Certification!', 'success');
    }
  };

  return (
    <PortalLayout title="Driver Welfare & Training Academy" subtitle="Free skill up-gradation courses, quiz certifications & welfare benefits">
      <div style={{ display: 'flex', flexDirection: 'column', gap: '28px' }}>
        {/* Certificate Ready Alert Banner */}
        <div
          className="glass-panel"
          style={{
            padding: '20px 24px',
            backgroundColor: 'rgba(16, 185, 129, 0.1)',
            border: '1px solid var(--color-success)',
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '16px',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
            <Award size={36} color="var(--color-success)" />
            <div>
              <h3 style={{ fontSize: '1.15rem', fontWeight: 700, margin: 0 }}>TruckMitr Certified Commercial Driver 2026</h3>
              <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', margin: '2px 0 0' }}>
                You have completed mandatory highway safety modules. Transporters prioritize verified certified drivers.
              </p>
            </div>
          </div>
          <Button
            variant="primary"
            size="sm"
            icon={Download}
            onClick={() => showToast('Downloading Official TruckMitr Driver Certificate PDF...', 'success')}
          >
            Download Certificate
          </Button>
        </div>

        {/* Video Courses Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '24px' }}>
          {courses.map((course) => (
            <Card key={course.id} style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                  <Badge variant={course.completed ? 'success' : 'primary'} size="sm">
                    {course.completed ? '✓ Completed' : 'In Progress'}
                  </Badge>
                  <span style={{ fontSize: '0.8rem', color: 'var(--text-dim)' }}>{course.duration}</span>
                </div>

                <h3 style={{ fontSize: '1.15rem', fontWeight: 700, marginBottom: '8px' }}>{course.title}</h3>
                <p style={{ fontSize: '0.875rem', color: 'var(--text-muted)', lineHeight: '1.6', marginBottom: '16px' }}>
                  {course.description}
                </p>
              </div>

              <div style={{ display: 'flex', gap: '10px' }}>
                <Button
                  variant="secondary"
                  size="sm"
                  fullWidth
                  icon={Play}
                  onClick={() => showToast(`Playing video course: ${course.title}`, 'info')}
                >
                  Watch Lessons
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  icon={Award}
                  onClick={() => {
                    setQuizResult(null);
                    setQuizAnswers({});
                    setQuizModalOpen(true);
                  }}
                >
                  Take Quiz
                </Button>
              </div>
            </Card>
          ))}
        </div>
      </div>

      {/* Interactive Quiz Modal */}
      <Modal
        isOpen={quizModalOpen}
        onClose={() => setQuizModalOpen(false)}
        title="Highway Safety Knowledge Quiz"
        footer={
          quizResult ? (
            <Button variant="primary" onClick={() => setQuizModalOpen(false)}>Done</Button>
          ) : (
            <>
              <Button variant="ghost" onClick={() => setQuizModalOpen(false)}>Cancel</Button>
              <Button variant="primary" onClick={handleQuizSubmit}>Submit Quiz Answers</Button>
            </>
          )
        }
      >
        {quizResult ? (
          <div style={{ textAlign: 'center', padding: '20px 0' }}>
            <Award size={54} color="var(--color-success)" style={{ marginBottom: '12px' }} />
            <h3 style={{ fontSize: '1.5rem', fontWeight: 800 }}>Score: {quizResult.score} / {quizResult.total}</h3>
            <p style={{ color: 'var(--text-muted)', marginTop: '8px' }}>
              {quizResult.passed ? 'Excellent! You passed the assessment.' : 'Try again to score 100% and earn your badge.'}
            </p>
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            {quizQuestions.map((q, qIdx) => (
              <div key={q.id}>
                <h4 style={{ fontSize: '0.95rem', fontWeight: 600, marginBottom: '10px' }}>
                  {qIdx + 1}. {q.question}
                </h4>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  {q.options.map((opt, optIdx) => (
                    <label
                      key={opt}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '10px',
                        padding: '10px 14px',
                        borderRadius: 'var(--radius-sm)',
                        backgroundColor: quizAnswers[q.id] === optIdx ? 'var(--color-primary-light)' : 'var(--bg-input)',
                        border: `1px solid ${quizAnswers[q.id] === optIdx ? 'var(--color-primary)' : 'var(--border-subtle)'}`,
                        cursor: 'pointer',
                        fontSize: '0.9rem',
                      }}
                    >
                      <input
                        type="radio"
                        name={q.id}
                        checked={quizAnswers[q.id] === optIdx}
                        onChange={() => setQuizAnswers({ ...quizAnswers, [q.id]: optIdx })}
                      />
                      <span>{opt}</span>
                    </label>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </Modal>
    </PortalLayout>
  );
};
