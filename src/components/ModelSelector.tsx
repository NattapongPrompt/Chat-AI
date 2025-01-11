import React from 'react';
import { Model } from '../types/interfaces';
import { availableModels } from '../services/modelService';

const ModelSelector: React.FC = () => {
  const [selectedModel, setSelectedModel] = React.useState<string>(availableModels[0].id);

  return (
    <div className="p-4 border-b border-gray-200 dark:border-gray-700">
      <select
        value={selectedModel}
        onChange={(e) => setSelectedModel(e.target.value)}
        className="w-48 p-2 rounded border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
      >
        {availableModels.map((model) => (
          <option key={model.id} value={model.id}>
            {model.name}
          </option>
        ))}
      </select>
    </div>
  );
};

export default ModelSelector;
