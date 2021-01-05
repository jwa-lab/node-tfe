variable "randoms" {
  type = list(object({
    id = number
    length  = number
  }))
}
