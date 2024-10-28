/* eslint-disable react/prop-types */
import { useState } from 'react'

const FlashcardItem = ({ flashcard, isFlipped, onFlip, onEdit, onDelete }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [editedCard, setEditedCard] = useState(flashcard);
  
    const handleSave = () => {
      onEdit(flashcard.id, editedCard);
      setIsEditing(false);
    };
  
    return (
      <>
        <div className={`flashcard-custom ${isFlipped ? 'flipped' : ''}`} onClick={onFlip}>
          <div className="flashcard-content-custom">
            <div className="front">{flashcard.question}</div>
            <div className="back">{flashcard.answer}</div>
          </div>
          <div className="flashcard-actions">
            <button onClick={(e) => { e.stopPropagation(); setIsEditing(true); }}>Edit</button>
            <button onClick={(e) => { e.stopPropagation(); onDelete(flashcard.id); }}>Delete</button>
          </div>
        </div>
        {isEditing && (
          <div className="modal-overlay">
            <div className="modal-content">
              <h2>Edit Flashcard</h2>
              <input
                value={editedCard.question}
                onChange={(e) => setEditedCard({ ...editedCard, question: e.target.value })}
                placeholder="Question"
              />
              <input
                value={editedCard.answer}
                onChange={(e) => setEditedCard({ ...editedCard, answer: e.target.value })}
                placeholder="Answer"
              />
              <div className="modal-actions">
                <button onClick={handleSave}>Save</button>
                <button onClick={() => setIsEditing(false)}>Cancel</button>
              </div>
            </div>
          </div>
        )}
      </>
    );
}

export default FlashcardItem