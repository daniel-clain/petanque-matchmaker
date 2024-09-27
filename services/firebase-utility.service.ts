import {
  ConvertFirebaseListObjectToIDArray,
  HasId,
} from '../types/tournament-types'

type ValidationFunction<T extends HasId> = (
  data: Record<number, Omit<T, 'id'>>
) => data is T

export function convertFirebaseListToAppArray<T extends HasId>(
  firebaseObject: Record<number, Omit<unknown, 'id'>>,
  validate: ValidationFunction<T>
): ConvertFirebaseListObjectToIDArray<T> {
  return Object.entries(firebaseObject)
    .map(([id, item]) => ({
      ...item,
      id, // Add the id back in
    }))
    .filter(validate) as ConvertFirebaseListObjectToIDArray<T>
}
