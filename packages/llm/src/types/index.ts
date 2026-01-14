/**
 * Core type definitions for NovaAI LLM package
 * Defines interfaces for model configuration, generation, metrics, and inference
 */

/**
 * Configuration interface for LLM models
 */
export interface ModelConfig {
  /** Unique identifier for the model */
  modelId: string;
  
  /** Human-readable name of the model */
  name: string;
  
  /** Model version */
  version: string;
  
  /** Model type (e.g., 'transformer', 'moe', 'hybrid') */
  type: 'transformer' | 'moe' | 'hybrid' | string;
  
  /** Provider of the model (e.g., 'openai', 'anthropic', 'custom') */
  provider: string;
  
  /** Number of parameters in the model */
  parameterCount: number;
  
  /** Context window size (max tokens) */
  contextWindow: number;
  
  /** Maximum output tokens */
  maxOutputTokens: number;
  
  /** Whether the model supports function calling */
  supportsFunctionCalling: boolean;
  
  /** Whether the model supports vision/image inputs */
  supportsVision: boolean;
  
  /** Custom metadata */
  metadata?: Record<string, unknown>;
}

/**
 * Configuration interface for text generation
 */
export interface GenerationConfig {
  /** Temperature controls randomness (0.0 - 2.0, default: 1.0) */
  temperature?: number;
  
  /** Top-p (nucleus) sampling parameter (0.0 - 1.0) */
  topP?: number;
  
  /** Top-k sampling parameter */
  topK?: number;
  
  /** Frequency penalty (-2.0 to 2.0) */
  frequencyPenalty?: number;
  
  /** Presence penalty (-2.0 to 2.0) */
  presencePenalty?: number;
  
  /** Maximum number of tokens to generate */
  maxTokens?: number;
  
  /** Number of completions to generate */
  numCompletions?: number;
  
  /** Stop sequences that halt generation */
  stopSequences?: string[];
  
  /** Seed for reproducible outputs */
  seed?: number;
  
  /** Custom parameters */
  customParameters?: Record<string, unknown>;
}

/**
 * Interface for model performance and usage metrics
 */
export interface ModelMetrics {
  /** Total number of inference requests processed */
  totalRequests: number;
  
  /** Total number of input tokens processed */
  totalInputTokens: number;
  
  /** Total number of output tokens generated */
  totalOutputTokens: number;
  
  /** Average latency in milliseconds */
  averageLatency: number;
  
  /** Minimum latency in milliseconds */
  minLatency: number;
  
  /** Maximum latency in milliseconds */
  maxLatency: number;
  
  /** Error count */
  errorCount: number;
  
  /** Success rate (0.0 - 1.0) */
  successRate: number;
  
  /** Average cost per request (in currency units) */
  averageCostPerRequest?: number;
  
  /** Timestamp of when metrics were recorded */
  timestamp: number;
  
  /** Custom metrics */
  customMetrics?: Record<string, unknown>;
}

/**
 * Interface for a single message in conversation
 */
export interface Message {
  /** Message role (e.g., 'user', 'assistant', 'system') */
  role: 'user' | 'assistant' | 'system' | string;
  
  /** Content of the message */
  content: string;
  
  /** Optional message name/identifier */
  name?: string;
  
  /** Timestamp when message was created */
  timestamp?: number;
  
  /** Optional function calls in the message */
  functionCalls?: {
    name: string;
    arguments: Record<string, unknown>;
  }[];
  
  /** Optional function call result */
  functionResult?: {
    name: string;
    result: unknown;
  };
  
  /** Custom metadata */
  metadata?: Record<string, unknown>;
}

/**
 * Interface for conversation context
 */
export interface ConversationContext {
  /** Unique identifier for the conversation */
  conversationId: string;
  
  /** Array of messages in the conversation */
  messages: Message[];
  
  /** System prompt/instructions for the conversation */
  systemPrompt?: string;
  
  /** Current model configuration */
  modelConfig?: ModelConfig;
  
  /** Generation configuration for this conversation */
  generationConfig?: GenerationConfig;
  
  /** Conversation metadata (user info, session, etc.) */
  metadata?: Record<string, unknown>;
  
  /** Timestamp when conversation was created */
  createdAt?: number;
  
  /** Timestamp of last message */
  lastMessageAt?: number;
}

/**
 * Interface for inference request
 */
export interface InferenceRequest {
  /** Unique request identifier */
  requestId?: string;
  
  /** The input prompt/query */
  prompt: string;
  
  /** Model to use for inference */
  modelId: string;
  
  /** Generation configuration */
  generationConfig?: GenerationConfig;
  
  /** Conversation context (for multi-turn) */
  conversationContext?: ConversationContext;
  
  /** Array of messages for multi-turn conversation */
  messages?: Message[];
  
  /** Optional system prompt */
  systemPrompt?: string;
  
  /** Request metadata */
  metadata?: Record<string, unknown>;
  
  /** Timeout in milliseconds */
  timeout?: number;
  
  /** Retry configuration */
  retryConfig?: {
    maxRetries: number;
    retryDelay: number;
  };
}

/**
 * Interface for inference response
 */
export interface InferenceResponse {
  /** Unique request identifier (matches request) */
  requestId: string;
  
  /** Model that processed the request */
  modelId: string;
  
  /** Generated text content */
  content: string;
  
  /** Array of alternative completions (if requested) */
  alternatives?: string[];
  
  /** Number of input tokens used */
  inputTokens: number;
  
  /** Number of output tokens generated */
  outputTokens: number;
  
  /** Total tokens used */
  totalTokens: number;
  
  /** Stop reason (e.g., 'stop', 'length', 'content_filter') */
  stopReason?: string;
  
  /** Whether the response was filtered */
  filtered?: boolean;
  
  /** Response metadata */
  metadata?: {
    latency?: number;
    cost?: number;
    [key: string]: unknown;
  };
  
  /** Timestamp when response was generated */
  timestamp: number;
  
  /** Error information if request failed */
  error?: {
    code: string;
    message: string;
    details?: Record<string, unknown>;
  };
}

/**
 * Interface for tokenizer configuration
 */
export interface TokenizerConfig {
  /** Tokenizer identifier */
  tokenizerId: string;
  
  /** Type of tokenizer (e.g., 'bpe', 'sentencepiece', 'wordpiece') */
  type: 'bpe' | 'sentencepiece' | 'wordpiece' | string;
  
  /** Vocabulary size */
  vocabSize: number;
  
  /** Special tokens configuration */
  specialTokens: {
    /** Padding token ID */
    padToken?: number;
    
    /** Unknown token ID */
    unkToken?: number;
    
    /** Start of sequence token ID */
    bosToken?: number;
    
    /** End of sequence token ID */
    eosToken?: number;
    
    /** Custom special tokens */
    custom?: Record<string, number>;
  };
  
  /** Maximum sequence length */
  maxSequenceLength?: number;
  
  /** Whether to lower case tokens */
  lowerCase?: boolean;
  
  /** Tokenizer metadata */
  metadata?: Record<string, unknown>;
}
