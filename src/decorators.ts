export function withTimestamp(
  target: any,
  propertyKey: string,
  descriptor: PropertyDescriptor
) {
  const originalMethod = descriptor.value;
  descriptor.value = function (message: string) {
    const timestamp = new Date().toISOString().replace('T', ' ').substring(0, 19);
    const newMessage = `[${timestamp}] ${message}`;
    return originalMethod.call(this, newMessage);
  };
}

export function uppercase(
  target: any,
  propertyKey: string,
  descriptor: PropertyDescriptor
) {
  const originalMethod = descriptor.value;
  descriptor.value = function (message: string) {
    const upperMessage = message.toUpperCase();
    return originalMethod.call(this, upperMessage);
  };
}

