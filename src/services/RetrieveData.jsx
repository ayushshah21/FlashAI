/* eslint-disable react/prop-types */
import { useEffect, useState, useRef } from "react";
import axios from "axios";
import { v4 as uuidv4 } from 'uuid';
import FlashcardItem from "./FlashcardItem";



export default function RetrieveData({ input }) {
  const [loading, setLoading] = useState(false);
  const [flippedCards, setFlippedCards] = useState({});
  const flashcardsRef = useRef(null);
  const [flashcards, setFlashcards] = useState([]);
  const [generationCount, setGenerationCount] = useState(1);
  const [isAddingCard, setIsAddingCard] = useState(false);
  const [newCard, setNewCard] = useState({ question: "", answer: "" });
  const [isSaving, setIsSaving] = useState(false);
  const [saveError, setSaveError] = useState(null);

  const fetchFlashcards = async () => {
    setLoading(true);
    try {
      const apiUrl = "https://cxe746ak0l.execute-api.us-east-1.amazonaws.com/dev";
      const payload = { userTopic: input };
      
      console.log("Sending payload:", payload);
      
      const { data: response } = await axios.post(apiUrl, payload);
      
      if (response.flashcards && typeof response.flashcards === 'string') {
        const filteredData = response.flashcards.split('\n\n').slice(1);
        const formattedFlashcards = filteredData.map(card => {
          const [question, answer] = card.replace(/^\d+\.\s*/, "").replace("Question:", "").replace("Answer:", "").split('\n');
          return {
            id: uuidv4(),
            question: question?.trim() || "No Question",
            answer: answer?.trim() || "No Answer"
          };
        });
        setFlashcards(prevCards => [...prevCards, ...formattedFlashcards]);
      } else {
        console.error("Invalid response format:", response);
      }
      
      setLoading(false);
      flashcardsRef.current?.scrollIntoView({ behavior: 'smooth' });
    } catch (error) {
      console.error("Error details:", error.response?.data);
      console.error("Full error object:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFlashcards();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [input, generationCount]);

  const handleCardClick = (index) => {
    setFlippedCards((prev) => ({ ...prev, [index]: !prev[index] }));
  };

  const handleEditCard = (id, updatedCard) => {
    setFlashcards(cards => cards.map(card => 
      card.id === id ? { ...card, ...updatedCard } : card
    ));
  };

  const handleDeleteCard = (id) => {
    setFlashcards(cards => cards.filter(card => card.id !== id));
  };

  const handleAddCard = () => {
    setIsAddingCard(true);
  };

  const handleSaveNewCard = () => {
    if (newCard.question.trim() && newCard.answer.trim()) {
      setFlashcards(cards => [...cards, { ...newCard, id: uuidv4() }]);
      setNewCard({ question: "", answer: "" });
      setIsAddingCard(false);
    }
  };

  const handleSaveCollection = () => {
    if (flashcards.length === 0) {
      console.log("No flashcards to save");
      return;
    }
  
    setIsSaving(true);
    setSaveError(null);
  
    try {
      const collectionId = Date.now().toString(); // Generate a unique ID
      const collectionName = input || "Generated Collection"; // Use input or default name
      const collection = {
        id: collectionId,
        topic: collectionName,
        flashcards: flashcards,
        createdAt: new Date().toISOString()
      };
  
      // Get existing collections from local storage
      const existingCollections = JSON.parse(localStorage.getItem('flashcardCollections')) || [];
  
      // Add new collection
      existingCollections.push(collection);
  
      // Save updated collections to local storage
      localStorage.setItem('flashcardCollections', JSON.stringify(existingCollections));
  
      // Show an alert when the collection is successfully saved
      window.alert(`Collection "${collectionName}" has been saved successfully!`);
  
      console.log("Collection saved successfully:", collectionId);
    } catch (error) {
      console.error("Error saving collection:", error);
      setSaveError("Failed to save collection. Please try again.");
    } finally {
      setIsSaving(false);
    }
  };
  
  const handleGenerateMore = () => {
    setGenerationCount(prev => prev + 1);
  };

  return (
    <div className="flashcard-section-custom">
      <div className="flashcard-header-custom">
        <h2>Flashcards Preview</h2>
        <button className="flashcard-action-button" onClick={handleGenerateMore}>
          Generate More
        </button>
      </div>
      
      {flashcards.length > 0 && (
        <div className="existing-flashcards">
          <div className="flashcard-grid-custom" ref={flashcardsRef}>
            {flashcards.map((flashcard, index) => (
              <FlashcardItem
                key={flashcard.id}
                flashcard={flashcard}
                isFlipped={flippedCards[index]}
                onFlip={() => handleCardClick(index)}
                onEdit={handleEditCard}
                onDelete={handleDeleteCard}
              />
            ))}
          </div>
        </div>
      )}
      
      {loading && (
        <div className="new-flashcards-loading">
          <h3>Generating New Flashcards...</h3>
          <div className="loading-grid">
            {[...Array(10)].map((_, index) => (
              <div key={index} className="loading-card"></div>
            ))}
          </div>
        </div>
      )}
      
      <div className="flashcard-actions-container">
        <button className="flashcard-action-button" onClick={handleAddCard}>
          Add New Flashcard
        </button>
        <button 
          className="flashcard-action-button" 
          onClick={handleSaveCollection}
          disabled={isSaving || flashcards.length === 0}
        >
          {isSaving ? "Saving..." : "Save Collection"}
        </button>
      </div>

      {isAddingCard && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h2>Add New Flashcard</h2>
            <input
              value={newCard.question}
              onChange={(e) => setNewCard({ ...newCard, question: e.target.value })}
              placeholder="Question"
            />
            <input
              value={newCard.answer}
              onChange={(e) => setNewCard({ ...newCard, answer: e.target.value })}
              placeholder="Answer"
            />
            <div className="modal-actions">
              <button onClick={handleSaveNewCard}>Save</button>
              <button onClick={() => setIsAddingCard(false)}>Cancel</button>
            </div>
          </div>
        </div>
      )}
      
      {saveError && <p className="error-message">{saveError}</p>}
    </div>
  );
}

