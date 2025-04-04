export default function Timeout<T = void>(timeout: number, callback: () => T) {
  return new Promise((resolve) => 
    setTimeout(() => resolve(callback()), timeout),
  );
}