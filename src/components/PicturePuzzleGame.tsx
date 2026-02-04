import { motion, AnimatePresence } from 'framer-motion';
import { useState, useCallback } from 'react';
import { useConfetti } from '@/hooks/useConfetti';

interface Tile {
  id: number;
  currentPosition: number;
}

// Placeholder image - replace with your couple photo
const PUZZLE_IMAGE = 'https://images.unsplash.com/photo-1518199266791-5375a83190b7?w=400&h=400&fit=crop';

const PicturePuzzleGame = () => {
  const { burst } = useConfetti();
  const gridSize = 3; // 3x3 = 9 tiles
  const totalTiles = gridSize * gridSize;
  const tileSize = 100; // Size percentage for background positioning

  // Create shuffled tiles
  const createShuffledTiles = useCallback(() => {
    const tiles: Tile[] = Array.from({ length: totalTiles }, (_, i) => ({
      id: i,
      currentPosition: i,
    }));
    
    // Shuffle positions (Fisher-Yates)
    const positions = Array.from({ length: totalTiles }, (_, i) => i);
    for (let i = positions.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [positions[i], positions[j]] = [positions[j], positions[i]];
    }
    
    return tiles.map((tile, index) => ({
      ...tile,
      currentPosition: positions[index],
    }));
  }, [totalTiles]);

  const [tiles, setTiles] = useState<Tile[]>(() => createShuffledTiles());
  const [selectedTile, setSelectedTile] = useState<number | null>(null);
  const [isComplete, setIsComplete] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  // Check if puzzle is solved
  const checkCompletion = useCallback((currentTiles: Tile[]) => {
    return currentTiles.every(tile => tile.id === tile.currentPosition);
  }, []);

  // Handle tile click
  const handleTileClick = useCallback((tileId: number) => {
    if (isComplete) return;

    if (selectedTile === null) {
      setSelectedTile(tileId);
    } else if (selectedTile === tileId) {
      setSelectedTile(null);
    } else {
      // Swap tiles
      setTiles(prev => {
        const newTiles = [...prev];
        const tile1Index = newTiles.findIndex(t => t.id === selectedTile);
        const tile2Index = newTiles.findIndex(t => t.id === tileId);
        
        // Swap positions
        const tempPos = newTiles[tile1Index].currentPosition;
        newTiles[tile1Index].currentPosition = newTiles[tile2Index].currentPosition;
        newTiles[tile2Index].currentPosition = tempPos;
        
        // Check completion
        if (checkCompletion(newTiles)) {
          setIsComplete(true);
          setShowSuccess(true);
          burst({ x: 0.5, y: 0.5, count: 15 });
        }
        
        return newTiles;
      });
      setSelectedTile(null);
    }
  }, [selectedTile, isComplete, checkCompletion, burst]);

  // Reset puzzle
  const resetPuzzle = useCallback(() => {
    setTiles(createShuffledTiles());
    setSelectedTile(null);
    setIsComplete(false);
    setShowSuccess(false);
  }, [createShuffledTiles]);

  // Get tile position in grid
  const getTileStyle = useCallback((position: number) => {
    const row = Math.floor(position / gridSize);
    const col = position % gridSize;
    return {
      gridRow: row + 1,
      gridColumn: col + 1,
    };
  }, [gridSize]);

  // Get background position for each tile piece
  const getTileBackground = useCallback((tileId: number) => {
    const row = Math.floor(tileId / gridSize);
    const col = tileId % gridSize;
    return {
      backgroundImage: `url(${PUZZLE_IMAGE})`,
      backgroundSize: `${gridSize * 100}%`,
      backgroundPosition: `${col * (tileSize / (gridSize - 1))}% ${row * (tileSize / (gridSize - 1))}%`,
    };
  }, [gridSize, tileSize]);

  return (
    <div className="relative">
      <div className="text-center mb-6">
        <h3 className="font-display text-xl md:text-2xl font-semibold text-white mb-2">
          🧩 Picture Puzzle
        </h3>
        <p className="text-muted-foreground text-sm">
          Tap two tiles to swap them • Reveal the heart
        </p>
      </div>

      {/* Puzzle Grid */}
      <div 
        className="relative mx-auto w-64 h-64 md:w-72 md:h-72 rounded-2xl overflow-hidden"
        style={{
          display: 'grid',
          gridTemplateColumns: `repeat(${gridSize}, 1fr)`,
          gridTemplateRows: `repeat(${gridSize}, 1fr)`,
          gap: '3px',
          background: 'hsl(0 0% 15%)',
          padding: '3px',
        }}
      >
        <AnimatePresence>
          {tiles.map((tile) => (
            <motion.button
              key={tile.id}
              className={`relative rounded-lg cursor-pointer transition-all duration-200 overflow-hidden ${
                selectedTile === tile.id 
                  ? 'ring-2 ring-white ring-offset-2 ring-offset-background z-10' 
                  : ''
              }`}
              style={{
                ...getTileStyle(tile.currentPosition),
                ...getTileBackground(tile.id),
              }}
              onClick={() => handleTileClick(tile.id)}
              layout
              transition={{ 
                type: "spring", 
                stiffness: 300, 
                damping: 25,
                duration: 0.3,
              }}
              whileHover={{ scale: isComplete ? 1 : 1.05 }}
              whileTap={{ scale: isComplete ? 1 : 0.95 }}
            >
              {/* Tile number hint */}
              <span className="absolute inset-0 flex items-center justify-center text-white/30 text-xs font-medium">
                {tile.id + 1}
              </span>
              
              {/* Glow when selected */}
              {selectedTile === tile.id && (
                <motion.div
                  className="absolute inset-0 rounded-lg"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 0.3 }}
                  style={{
                    boxShadow: '0 0 20px hsl(var(--neon-pink))',
                  }}
                />
              )}
            </motion.button>
          ))}
        </AnimatePresence>
      </div>

      {/* Progress indicator */}
      <div className="mt-4 text-center">
        <p className="text-white/40 text-xs">
          {isComplete ? '🎉 Puzzle Complete!' : 'Tap tiles to swap positions'}
        </p>
      </div>

      {/* Success Overlay */}
      <AnimatePresence>
        {showSuccess && (
          <motion.div
            className="absolute inset-0 flex items-center justify-center bg-background/80 backdrop-blur-sm rounded-2xl"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
          >
            <motion.div
              className="text-center"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
            >
              <motion.span
                className="text-6xl block mb-4"
                animate={{ 
                  scale: [1, 1.15, 1],
                }}
                transition={{ duration: 1.5, ease: "easeInOut" }}
              >
                💖
              </motion.span>
              <p className="font-handwritten text-xl text-white mb-4">
                You did it! 🎉
              </p>
              <motion.button
                className="px-4 py-2 rounded-full text-sm font-medium text-white/70 hover:text-white transition-colors"
                style={{
                  background: 'hsl(0 0% 20%)',
                }}
                onClick={resetPuzzle}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Play Again
              </motion.button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default PicturePuzzleGame;
