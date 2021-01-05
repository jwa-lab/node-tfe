terraform {
  required_providers {
    random = {
      source = "hashicorp/random"
      version = "3.0.0"
    }
  }
}

resource "random_string" "random" {
  for_each = { for random in var.randoms : random.id => random }
  length = each.value.length
}